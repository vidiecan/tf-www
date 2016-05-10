$(function() {
    
    var params = {
        ruco: {
            name: 'Ručné zameranie',
            min_ludi: 2,
            plat: 8.0,
            priprava_merania_min: 0.0,
            trvanie_zamerania_min: 0.5,
            cena_pristroja: 0.0,
            travenie_modelu: 0.04,
            cena_modelu_hod: 20,
            magic_koef: 1.3
        },
        ultra: {
            name: 'Ultrazvukový diaľkomer',
            min_ludi: 2,
            plat: 8.0,
            priprava_merania_min: 0.0,
            trvanie_zamerania_min: 0.278,
            cena_pristroja: 0.0,
            travenie_modelu: 0.04,
            cena_modelu_hod: 20,
            magic_koef: 1.2
        },
        sken: {
            name: 'Laserový skener',
            min_ludi: 1,
            plat: 14.0,
            priprava_merania_min: 0.472,
            trvanie_zamerania_min: 0.639,
            cena_pristroja: 0.467,
            travenie_modelu: 0.035,
            cena_modelu_hod: 20,
            magic_koef: 1.0
        },
        mob: {
            name: "Mobilná aplikácia",
            min_ludi: 1,
            plat: 8.0,
            priprava_merania_min: 0.0,
            trvanie_zamerania_min: 0.694,
            cena_pristroja: 0.008,
            travenie_modelu: 0.007,
            cena_modelu_hod: 20,
            magic_koef: 1.1
        }
        
    };
    
    function get_selected_data_target(id_str) {
        return jQuery(id_str).find("li.active").attr("data-target");
    }

    function get_selected_text(id_str) {
        return jQuery(id_str).find("li.active").text();
    }
    
    function result() {
        var html = "";
        
        function round(i) {
            return Math.round(i * 1000) / 1000;
        }
        
        function display_one_row(values, name, param, m2, cena_koef, zlozitost_koef, model_koef, magic_koef) {
            var cena_pripravy = param.min_ludi * param.plat * (param.priprava_merania_min / 60.) * m2;
            var cena_merania = param.min_ludi * param.plat * (param.trvanie_zamerania_min / 60.) * m2;
            var cena_pristrojov = (param.trvanie_zamerania_min / 60.) * param.cena_pristroja;
            
            var cena_modelovania = param.travenie_modelu * m2 * param.cena_modelu_hod;
            var suma = cena_pripravy + cena_merania + cena_pristrojov + cena_modelovania;
            
            suma = suma * cena_koef * zlozitost_koef * model_koef * param.magic_koef;
            
            values.push([name, suma]);
            var h = "";
            h += "<tr>";
            h += "<td>" + name + "</td>";
            h += "<td>" + round(cena_pripravy).toString() + "</td>";
            h += "<td>" + round(cena_merania).toString() + "</td>";
            h += "<td>" + round(cena_pristrojov).toString() + "</td>";
            h += "<td>" + round(cena_modelovania).toString() + "</td>";
            h += "<td>" + round(suma).toString() + "</td>";
            h += "</tr>";
            return h;
        }
        
        function header(m2, cena_koef, zlozitost_koef, model_koef) {
            var html = '<div class="well">';
            html += "<h2>" + m2.toString() + "m<sup>2</sup> | cena koef=" + cena_koef + " | zlozitost koef=" + zlozitost_koef + " | model koef=" + model_koef + "</h2>"; 
            html += '<table class="table table-striped table-generated-results">';
            html += '<thead><tr>';
            html += '<th>Spôsob zameriavania</th>';
            html += '<th>Cena prípravy</th>';
            html += '<th>Cena merania</th>';
            html += '<th>Cena prístrojov</th>';
            html += '<th>Cena modelovania</th>';
            html += '<th>Suma celkom</th>';
            html += '</tr></thead>';
            html += '<tbody>';
            return html;
        }
        
        function footer() {
            var html = "";
            html += '</tbody>';
            html += '</table>';
            html += "</div>";
            return html;
        }
        
        function graph(sel, values) {
            $("#" + sel).html('');
            var vals = [];
            var ticks = [];
            for (var i = 0; i < values.length; ++i) {
                vals.push(values[i][1]);
                ticks.push([i + 1, values[i][0]]);
            }
            plot1 = $.jqplot(sel, [vals], {
                seriesDefaults:{
                    renderer:$.jqplot.BarRenderer,
                    pointLabels: { show: true }
                },
                axes: {
                    xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: ticks
                    }
                },
            });            
        }
        
        var html = "";
        var m2 = 1;
        var cena_koef  = 1.0;
        var zlozitost_koef  = 1.0;
        var model_koef = 1.0;
        html += header(m2, cena_koef, zlozitost_koef, model_koef);
        var values = [];
        html += display_one_row(
            values, params.ruco.name, params.ruco, m2, cena_koef, zlozitost_koef, model_koef
        );
        html += display_one_row(
            values, params.ultra.name, params.ultra, m2, cena_koef, zlozitost_koef, model_koef
        );
        html += display_one_row(
            values, params.sken.name, params.sken, m2, cena_koef, zlozitost_koef, model_koef
        );
        html += display_one_row(
            values, params.mob.name, params.mob, m2, cena_koef, zlozitost_koef, model_koef
        );
        html += footer();
        
        m2 = parseFloat($("#q-vymera-value").val());
        cena_koef = parseFloat(get_selected_data_target("#q2"));
        zlozitost_koef = parseFloat(get_selected_data_target("#q4"));
        model_koef = parseFloat(get_selected_data_target("#q5"));
        html += header(m2, cena_koef, zlozitost_koef, model_koef);
        var values = [];
        html += display_one_row(
            values, params.ruco.name, params.ruco, m2, cena_koef, zlozitost_koef, model_koef
        );
        html += display_one_row(
            values, params.ultra.name, params.ultra, m2, cena_koef, zlozitost_koef, model_koef
        );
        html += display_one_row(
            values, params.sken.name, params.sken, m2, cena_koef, zlozitost_koef, model_koef
        );
        html += display_one_row(
            values, params.mob.name, params.mob, m2, cena_koef, zlozitost_koef, model_koef
        );
        html += footer();
        
        
        $("#result").html(html);
        graph("chart", values);
    }

    $('.selectable-group li').click(function(e) {
        e.preventDefault()
        $(this).parent().find('li').removeClass('active');
        $(this).addClass('active');
        $(this).parent().parent().parent().find(".next-btn").fadeIn();

        var id_str = $(this).parent().attr("id");        
        $(".set-" + id_str).each(function() {
            var id_str_sel = "#" + id_str;
            var html = get_selected_data_target(id_str_sel);
            html += " | ";
            html += get_selected_text(id_str_sel);
            $(this).html(html);
        });  
        result();
    });
    
    $("#q-vymera-value").bind('keyup mouseup', function () {
        var v = $(this).val();
        var btn = $(this).parent().parent().parent().parent().parent().parent().find(".next-btn");
        var cls = "label-success";
        var self = $(this);
        
        $(".set-q3").each(function() {
            $(this).html(self.val());
        });
        result();
        
        if (v && v.length && !isNaN(v)) {
            btn.fadeIn();
            $(this).addClass(cls);
        }else {
            btn.hide();
            $(this).removeClass(cls);
        }
    });
    
    result();
});
