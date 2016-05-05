$(function() {
    
    $('.selectable-group li').click(function(e) {
        e.preventDefault()

        $(this).parent().find('li').removeClass('active');
        $(this).addClass('active');
        $(this).parent().parent().parent().find(".next-btn").fadeIn();
    });
    
    function get_selected_data_target(id_str) {
        return jQuery(id_str).find("li.active").attr("data-target");
    }
    
    function get_selected_text(id_str) {
        return jQuery(id_str).find("li.active").text();
    }
    
        
    $('.call-result').bind('click', function(event) {
        var html = "";
        
        // 1. typ
        html += " [Q1] "; 
        html += get_selected_data_target("#q1");
        html += " + "; 

        //        
        html += " [Q2] "; 
        html += get_selected_data_target("#q2");
        html += get_selected_text("#q2");
        html += " + "; 

        //        
        html += " [Q3] "; 
        html += $("#q-vymera-value").val();
        html += " + "; 
        
        //        
        html += " [Q4] "; 
        html += get_selected_data_target("#q4");
        html += get_selected_text("#q4");
        html += " + "; 

        //        
        html += " [Q5] "; 
        html += get_selected_data_target("#q5");
        html += get_selected_text("#q5");
        html += " + "; 
        
        // set it
        $("#result").html(html);
    });
    
    $("#q-vymera-value").bind('keyup mouseup', function () {
        var v = $(this).val();
        var btn = $(this).parent().parent().parent().parent().parent().parent().find(".next-btn");
        var cls = "label-success";
        if (v && v.length && !isNaN(v)) {
            btn.fadeIn();
            $(this).addClass(cls);
        }else {
            btn.hide();
            $(this).removeClass(cls);
        }
    });
    
});
