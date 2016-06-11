if (typeof(listSpace === "undefined")) {
    var listSpace = {};
}
(function() {
    $(document).ready(function() {
        //adds input item to container
        $("#inputcreateitem").keyup(function(e) {
            var key = e.which;
            if (key === 13) {
                var getValue = $("#inputcreateitem").val();
                
                $(".createditems").append("<p class='createditem'>" + getValue + "&nbsp&nbsp&nbsp&nbsp&nbsp" +
                                          "<a href='#'><span class='glyphicon glyphicon-remove deleteitem'></span></a>" + 
                                          "</p>");
                    $(".container").droppable({
                        accept: "p.createditem",
                        hoverClass: "cell-highlght",
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
                $(document).on('click', 'a', function (e) {
                    e.preventDefault();
                    $(this).parent().remove();
                });
                $("#inputcreateitem").val("");
            }
        });
        
    });
   // listSpace.createItem();
})();
