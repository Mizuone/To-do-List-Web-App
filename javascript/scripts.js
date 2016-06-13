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
                // save to local storage
                //localStorage["tasks"] = JSON.stringify(tasks);
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
                        //appendTo: '#container',
                        //helper: 'original',
                        scroll: true
                    });
                $(".createditems ,.container").on('click', 'p', function (e) {
                    self = $(this);
                    taskID = self.attr('id');
                    localStorage.removeItem(taskID);
                    //console.log(self);
                    self.slideUp('slow', function () {
                        self.remove();
                    });
                });
        }
        //get storage
        for(var i=0; i < localStorage.length; i++) {
            var taskID = "task-" + i;
            $(".createditems").append("<p class='createditem' id='" + taskID + "'>" + "<a href='#'>" + localStorage.getItem(taskID) + "</a>" + "&nbsp&nbsp&nbsp&nbsp&nbsp" +
                                    "<a href='#'><span class='glyphicon glyphicon-remove deleteitem'></span></a>" + 
                                    "</p>");
            listSpace.addDragAndDrop();
        }
    });
    

    //window.localStorage.clear();
   // listSpace.createItem();
})();
