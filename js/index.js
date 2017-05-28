/**
 * Created by JrBenDa on 5/27/2017.
 */
var controlProperty = {
    'Label': {
        'text': 'label'
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
    $(document).on('keyup', '#properties input', function (event) {
        var type = $(this).data('name');
        if (type == 'text') {
            $('.obj-dropped.selected').find('label:first-child').text($(this).val());
        }
    });
    $(document).on('click', '.obj-dropped', function (event) {
        event.preventDefault();
        $('.obj-dropped').removeClass('selected');
        $(this).addClass('selected');
        var typeControl = $(this).data('type');
        var property = $("#properties");
        property.html("");
        switch (typeControl) {
            case 'Label':
            {
                var cp = controlProperty[typeControl];
                var control = $(this).find('label:first-child');
                var text = control.html();
                cp['text'] = text;
                Object.keys(cp).forEach(function (key, index) {
                    property.append(`<div>
                    ${key}
                    </div>
                    <div><input type="text" data-name="${key}" value="${cp[key]}" /></div>
                    `);
                });
                break;
            }
            // case ...
        }
    });
});

function mapAndRenderControl(type) {

    switch (type) {
        case 'Textbox':
            return `<input type="text" placeHolder="Textbox"/>`;
            break;
        case 'Combobox':
            return `<select>
        <option value="volvo">Item 1</option>
        <option value="saab">Item 2</option>
        <option value="opel">Item 3</option>
        <option value="audi">Item 4</option>
        </select>`;
            break;
        case 'Textarea':
            return `<textarea rows="4">content of text area</textarea>`;
            break;
        case 'Radio':
            return `<input type="radio"/>`;
            break;
        case 'Checkbox':
            return `<input type="checkbox"/>`;
            break;
        case 'Label':
            return `<label>Label</label>`;
            break;
        default:
            return type;
            break;
    }
}
