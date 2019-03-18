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
                        for(var i=0; i < qList.length; i++){
                            views.html(
                                    '<div style="text-align: center">\
                                    <a href="#">'+qList[i]+'</a>\
                                    </div> \
                                    <br>');
                            }
                    }
                else{
                        
                        var views = $('#show');
            
                        views.html(
            
                            )
            
                }
        }  
                    
            
            


            
            
        });
    });
});
    
    
    
    
    