/**
 * Created by JrBenDa on 5/27/2017.
 */
var controlProperty = {
    'Label': {
        'text': 'label',
        'style': ''
    },
    'Textbox': {
        'placeHolder': '',
        'style': ''
    },
    'Textarea': {
        'placeHolder': '',
        'style': '',
        'cols': 2,
        'rows': 4
    },
    'Combobox': {
        'items': '',
        'style': ''
    },
    'Radio': {
        'name': '',
        'style': ''
    }
};
$(document).ready(function () {
    $("#drop").droppable({
        activeClass: "highlight",
        hoverClass: "hover",
        drop: function (event, ui) {
            $(this).html($(this).html() + '<span class="obj-dropped" data-type="' + ui.draggable.data('type') + '">' + mapAndRenderControl(ui.draggable.data('type')) + '</span>');
        }
    });

    $("#drag span").draggable({
        cursor: 'move',
        revert: true
    });

    $(document).on('click', '.remo_control', function (event) {
        $(this).parents('.obj-dropped.selected').remove();
        setTimeout(function () {
            $("#properties").html('');
        }, 500);
    });
    $(document).on('keyup', '#properties input', function (event) {
        var attr = $(this).data('attr');
        var control_name = $(this).data('control_name');
        var control = $('.obj-dropped.selected').find("[name=" + control_name + "]");
        var value = $(this).val();
        switch (attr) {
            case 'text':
            {
                control.text(value);
                break;
            }
            case 'items':
            {
                var items = $(this).val().split(';');
                control.html('');
                items.map(function (item) {
                    control.append(`<option value="${item}">${item}</option>`);
                });
                break;
            }
            default :
            {
                control.attr(attr, value);
                break;
            }
        }

    });
    $(document).on('click', '.obj-dropped', function (event) {
        $('.obj-dropped').removeClass('selected');
        $(this).addClass('selected');
        var typeControl = $(this).data('type');
        var property = $("#properties");
        var cp = controlProperty[typeControl];
        var control = null;
        var ctrName = "";
        property.html("");
        switch (typeControl) {
            case 'Label':
            {
                control = $(this).find('label:first-child');
                var text = control.html();
                cp['text'] = text;
                var st = $(control).attr('style');
                if (typeof(st) != "undefined")
                    cp['style'] = st;
                break;
            }
            case 'Textbox':
            {
                control = $(this).find('input:first-child');
                var ph = $(control).attr('placeHolder');
                var st = $(control).attr('style');
                if (typeof(ph) != "undefined")
                    cp['placeHolder'] = ph;
                if (typeof(st) != "undefined")
                    cp['style'] = st;

                break;
            }
            case 'Textarea':
            {
                control = $(this).find('textarea:first-child');
                var ph = $(control).attr('placeHolder');
                var st = $(control).attr('style');
                var cols = $(control).attr('cols');
                var rows = $(control).attr('rows');
                if (typeof(ph) != "undefined")
                    cp['placeHolder'] = ph;
                if (typeof(st) != "undefined")
                    cp['style'] = st;
                if (typeof(cols) != "undefined")
                    cp['cols'] = cols;
                if (typeof(rows) != "undefined")
                    cp['rows'] = rows;

                break;
            }
            case 'Combobox':
            {
                control = $(this).find('select:first-child');
                var items = [];
                $(control).find('option').each(function () {
                    //alert(this.text + ' ' + this.value);
                    items.push(this.text);
                });
                cp['items'] = items.join(';');
                var st = $(control).attr('style');
                if (typeof(st) != "undefined")
                    cp['style'] = st;

                break;
            }
            case 'Radio':
            {
                control = $(this).find('input:first-child');
                var name = $(control).attr('name');
                if (typeof(name) != "undefined")
                    cp['name'] = name;
                var st = $(control).attr('style');
                if (typeof(st) != "undefined")
                    cp['style'] = st;
                break;
            }
            // case ...
        }
        if (control != null) {
            ctrName = $(control).attr('name');
        }
        if (typeof(cp) != "undefined")
            Object.keys(cp).forEach(function (key, index) {
                property.append(`<div>
                    ${key}
                    </div>
                    <div><input type="text" data-attr="${key}" data-control_name="${ctrName}" value="${cp[key]}" /></div>
                    `);
            });

    });
});

function mapAndRenderControl(type) {
    var date = new Date();
    var controlName = date.getTime();
    var closeDiv = `<a class="remo_control" title="Remove control">x</a>`;
    switch (type) {
        case 'Textbox':
            return `<input name="txt_${controlName}" type="text" placeHolder="Textbox"/>${closeDiv}`;
            break;
        case 'Combobox':
            return `<select name="${controlName}">
        <option value="Item 1">Item 1</option>
        <option value="Item 2">Item 2</option>
        </select>${closeDiv}`;
            break;
        case 'Textarea':
            return `<textarea name="txtarea_${controlName}" rows="4"></textarea>${closeDiv}`;
            break;
        case 'Radio':
            return `<input name="rdo_${controlName}" type="radio"/>${closeDiv}`;
            break;
        case 'Checkbox':
            return `<input name="chk_${controlName}" type="checkbox"/>${closeDiv}`;
            break;
        case 'Label':
            return `<label name="lbl_${controlName}">Label</label>${closeDiv}`;
            break;
        case 'Break-Line':
            return `<br/>`;
            break;
        default:
            return type;
            break;
    }
}
