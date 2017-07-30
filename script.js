$(document).ready(function() {
  var content = "Random Quote Machine at https://codepen.io/tmpbit/pen/QMLGvb&via=Roofer/Coder";
  var author = "";
  $("#title").css({color: "#FFF", transition: "3s", "font-size": "5em"});
  $("#refreshbtn").click(function() {

    var clr1 = $(".color1").css("color");
    $("#title").css({color: "#888", transition: "1s"});
    $(".color1").css({color: "#888", transition: "1s", "background-color": "#888"})
      .delay(1000)
      .promise()
      .then(function () {
        $.ajax({url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
          cache: false,
          //async: false,
          success: function(result){
            content = result[0]['content'];
            author = result[0]['title'];
            //author = "- " + author;
            $("#quote").html(content);
            $("#author").text(author);
            },
          error: function(xhr,status,error) {
            alert("Ajax error!:", xhr,status,error)}
            })
              .then(function() {
                if (clr1 == "rgb(0, 0, 0)") {
                  $("#title").css({transition: "2s", color: "black"});
                  $(".color1").css({transition: "2s", color: "white", "background-color": "black"});
                } else {
                  $("#title").css({transition: "2s", color: "white"});
                  $(".color1").css({transition: "2s", color: "black", "background-color": "white"});
                };
        })
    });
  });
  $("#twitterbtn").click(function() {
    var tw = "https://twitter.com/intent/tweet?text=";
    //
    if (author == "") {
      var twcontent = content
    } else {
      var twcontent = '"' + document.getElementById("quote").textContent + '"' + "\nby " + document.getElementById("author").textContent;
    };
    tw += twcontent;
    var winObjRef = window.open(tw, "twitterWindow", "width=550, height=420");
    if (winObjRef == null) {
      //alert(content + "\n" + author);
      alert("OOPS! The new window couldn't be created :(");
    };
  });
});
