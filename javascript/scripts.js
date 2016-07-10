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
        listSpace = function() {
            var i = 0;
            
            function createItem(id, value) {
                $(".createditems").append("<p class='createditem' id='" + id + "'>" + "<span>" + value + "</span>"  + "&nbsp&nbsp&nbsp&nbsp&nbsp" +
                                        "<a href='#'><span class='glyphicon glyphicon-remove deleteitem'></span></a>" + 
                                        "</p>");
            }
            
            $("#inputcreateitem").keyup(function(e) {
                var key = e.which;
                if (key === 13 && $("#inputcreateitem").val() !== " ") {
                    var getValue = $("#inputcreateitem").val();
                    var taskID = "task-" + i;
                    createItem(taskID, getValue);

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
                createItem(taskID, localStorage.getItem(taskID));

                listSpace.addDragAndDrop();
            }
        }
        listSpace();
    });
    //window.localStorage.clear();
})();
