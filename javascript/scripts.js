if (typeof(listSpace === "undefined")) {
    var listSpace = {};
}
(function() {
    if (localStorage['tasks']) {
        var tasks = JSON.parse(localStorage['tasks']);
    }else {
        var tasks = [];
    }
    $(document).ready(function() {
        //adds input item to container
        var i = 0;
        $("#inputcreateitem").keyup(function(e) {
            var key = e.which;
            if (key === 13) {
                var getValue = $("#inputcreateitem").val();
                var taskID = "task-" + i;
                $(".createditems").append("<p class='createditem' id='" + taskID + "'>" + "<span>" + getValue + "</span>" + "&nbsp&nbsp&nbsp&nbsp&nbsp" +
                                          "<a href='#'><span class='glyphicon glyphicon-remove deleteitem'></span></a>" + 
                                          "</p>");
                 listSpace.addDragAndDrop();
                $("#inputcreateitem").val("");
                tasks.push(getValue);
                i++;
                localStorage.setItem(taskID, getValue);
            }
        });
        listSpace.addDragAndDrop = function() {
         $(".container").droppable({
                        accept: "p.createditem",
                        tolerance: "pointer",
                        drop: function(event, ui) {
                            $(this).addClass("cell-dropped");
                            $(ui.draggable).appendTo(this);
                        }
                    });
                    $("p.createditem").draggable({
                        opacity: 0.7,
                        helper: 'clone',
                        scroll: true
                    });
                $(".createditems ,.container").on('mouseover', 'p', function (e) {
                    self = $(this);
                    taskID = self.attr('id');
                    $(".createditems , .container").on('click', 'a', function (e) {
                        $("#" + taskID).remove();
                        localStorage.removeItem(taskID);
                    });
                });
        }
        for(var i = 0; i < localStorage.length; i++) {
            var taskID = localStorage.key(i);
            $(".createditems").append("<p class='createditem' id='" + taskID + "'>" +  localStorage.getItem(taskID)  + "&nbsp&nbsp&nbsp&nbsp&nbsp" +
                                    "<a href='#'><span class='glyphicon glyphicon-remove deleteitem'></span></a>" + 
                                    "</p>");
            listSpace.addDragAndDrop();
        }
    });
    //window.localStorage.clear();
})();
