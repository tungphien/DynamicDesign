/**
 * Created by JrBenDa on 5/27/2017.
 */
var controlProperty = {
    'Label': {
        'name': 'label',
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
    $(document).on('click', '.obj-dropped', function (event) {
        event.preventDefault();
        console.log($(this).data('type'));
        var typeControl=$(this).data('type');
        switch (typeControl){
            case 'Label':{
                var cp=controlProperty[typeControl];
                console.log($(this).find('label')[0].innerHTML);
                var text=$(this).find('label')[0].innerHTML;
                cp['text']=text;
                console.log(cp);


                break;
            }
        }
    })
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
