if (typeof(listSpace === "undefined")) {
    var listSpace = {};
}
(function() {
    listSpace.createItem = function() {
        //Captures mouse movement
        document.onmousemove = mouseMove;
        function mouseMove(e) {
            e = e || window.event;
            
            var mousePos = mouseCoords(e);
        };
        function mouseCoords(e) {
            if (e.pageX || e.pageY) {
                return {x: e.pageX, y: e.pageY};
            }
            return { 
                     x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
                     y:ev.clientY + document.body.scrollTop  - document.body.clientTop
                   };
        };
        document.onmouseup = mouseUp;
        var dragObject = null;
        function makeClickable(object) {
            object.onmousedown = function() {
                dragObject = this;
                console.log(object);
            }
        }
        function mouseUp(e) {
            dragObject = null;
        }
        
        document.onmousemove = mouseMove;
        document.onmouseup = mouseUp;
        function getMouseOffset(target, e) {
            e = e || window.event;
            var docPos = getPosition(target);
            var mousePos = mouseCoords(e);
            return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
        }
        
    };
    $(document).ready(function() {
        //adds input item to container
        $("#inputcreateitem").keyup(function(e) {
            var key = e.which;
            if (key === 13) {
                var getValue = $("#inputcreateitem").val();
                $(".createditems").append("<p class='createditem'>" + getValue + "</p>");
            }
        });
    });
    listSpace.createItem();
})();