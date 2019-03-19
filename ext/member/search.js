$(document).ready(()=>{

    $('#searchbtn').click(()=>{  
        var name = $('#searchFile').val();
    
    $.ajax({
        url: '/member/searchFile/' + name ,
        success: function(response) 
        {
            if(response)
            {
                var views = $('#show');
                for(var i=0; i < response.length; i++){
                    views.html(
                    '<div style="text-align: center">\
                            <a href="/member/download/'+response+'">'+response+'</a>\
                            </div> \
                            <br>\
                            ');
                    }   
            }
            else{
                var views = $('#show');
                views.html('<div class="container emp-profile">\
                <h1 align:middle>File not found</h1>\
                </div>')
                }
        }            
         });
    });
});
    
    
    
    
    