function getParish() {
    //Ajax request - this gets all the parishes
    $.ajax({
        url: "/parish",
        type: "GET",
        contentType: "application/JSON",
        success: function (parishData) {
            $.each(parishData, function (index, parishData) { //iterer over collection i data
                const html = `
                    <div id="parishId-${parishData.id}">
                        ${parishData.name} ${parishData.parishCode} ${parishData.infectionPressure} ${parishData.shutDownTime}
                        <button onclick="parishDelete(${parishData.id})">
                            Delete
                         </button> 
                          <input onclick="return false;" type="checkbox" id="checkBoxId" ${compareDate(parishData.shutDownTime) ? "checked" : ""}>
                     </div>
                `
                $("#parishList").append(html)

            })
        },

    });



    //Create funktion
    $("#create_parish").submit(function (e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        let newParish = {
            parishCode: $('#parish_code').val(),
            name: $('#parish_name').val(),
            infectionPressure: $('#infection_pressure').val(),
            shutDownTime: $('#shutdown_time').val(),
            commune: parseInt($('#commune_id').val())
        };
        let json = JSON.stringify(newParish);
        $.ajax({
            type: "POST",
            url: "/parish",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                alert('In Ajax');
            }
        });

    });
}
function compareDate(shutDownTime) {
    if (shutDownTime == null) {
        return false
    }return new Date() >= new Date(shutDownTime);
}

    function parishDelete(id) {

        $.ajax({
            url: '/parish/' + id,
            type: 'DELETE',
            success: function () {
                $(`#parishId-${id}`).remove()
            }
            });
    }


$("#updateParish").click(function() {
    //Et javascript objekt
    let parishData = {
        id: $('#updateId').val(),
        parishCode: $('#parishCode').val(),
        name: $('#parishName').val(),
        infectionPressure: $('#infectionPressure').val(),
        shutDownTime: $('#shutDownTime').val(),
        communeId: parseInt($('#commune').val())

    };


    $.ajax({
        url: '/parish/' +$('#updateId').val(),
        type: 'PUT',
        //Ændre requestens body format til Json. Så den kan finde ud af det hele :)
        contentType: 'application/json',
        //Laver vores javascript object om til en string der indeholder Json
        data: JSON.stringify(parishData),
        success: function () {
           let html =` ${parishData.name} ${parishData.parishCode} ${parishData.infectionPressure} ${parishData.shutDownTime}
                        <button onclick="parishDelete(${parishData.id})">
                            Delete
                         </button> 
                          <input type="checkbox" id="checkBoxId" ${compareDate(parishData.shutDownTime) ? "checked" : ""}>`;
            $(`#parishId-${parishData.id}`).html(html)
        }


        });

})




function getCommune() {
    //Ajax request - this gets all the parishes
    $.ajax({
        url: "/commune",
        type: "GET",
        contentType: "application/JSON",
        success: function (communeData) {
            $.each(communeData, function (index, commune) { //iterer over collection i data
               let sum = 0;
               commune.parishSet.forEach(
                   function (parish) {
                       sum+=parish.infectionPressure;
                   }
               )
                const html = `
                    <div id="communeId-${commune.id}">
                        ${commune.name}
                       commune total infection rate: 
                        ${(sum).toFixed(2)}
                        ${commune.name}
                        commune adjusted infection rate:
                        ${(sum/commune.parishSet.length).toFixed(2)}
                     </div>
                `
                $("#communeList").append(html)
            })

        }
    });
}