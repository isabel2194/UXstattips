/*$("#root").mousemove(function(e) {
  parallaxIt(e, ".registro", -100);
});

function parallaxIt(e, target, movement) {
  var $this = $("#root");
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;

  TweenMax.to(target, 1, {
    x: ((relX - $this.width() / 2) / $this.width()) * movement,
    y: ((relY - $this.height() / 2) / $this.height()) * movement
  });
}*/
