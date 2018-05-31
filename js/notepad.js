function formatState (state) {
  //console.log('state', state);
    return     $('<button type="button" class="delete-me">X</button><span class="">' + state.text + '</span>');
 
};


notepad = {
    init : function(){

        notepad.restart();
        notepad.addList();
        $('.extention').click(notepad.saveInExtention);
        $('.local').click(notepad.saveToComputer);
        $('.new').click(notepad.clear);
    },
    restart : function(){
        title.bind('keydown.text', function(){
            notepad.onTitleSettedManually();
        });
        textarea.bind('keydown.text', function(){
            setTimeout(function(){
                notepad.saveInExtention();
                if(!title.data('manually setted') && title.val().length < 25){
                    title.val(textarea.val());
                }
                else{
                    notepad.onTitleSetted();
                }
            },2);
        });
    },
    clear : function(){
        title.add(textarea).val('');
        notepad.enableList();
    },
    addList : function(){
        if(!$('#files-list').length){
            $('<div id="files-list"></div>').appendTo($('.buttons'));


        }
        notepad.refreshList();
    },
    refreshList : function(){
        var list = $('#files-list');
        list.empty().append('<div class="part">' + "Load saved file" +"</div>");
                list.unbind('change').bind('change', notepad.loadFromStorage);
        let files = notepad.getAllSaved();
        for(let file of files){
            file = file.replace('item_','');
            $('#files-list').append('<option value="' + file + '">' + file +"</option>")
        }
        console.log(" $('#files-list').trigger('change.select2');");
        $('#files-list').trigger('change.select2');
        // $("#files-list").select2({
        //       templateResult: formatState,
        //       change : function(){
        //         console.log($("#files-list .delete-me"));
        //       }
        //     });

        
        
    },
    enableList : function(){
        $('#files-list').attr('disabled','disabled');
    },
    diableList : function(){
        $('#files-list').removeAttr('disabled');
    },
    onTitleSetted : function(){
        textarea.unbind('keydown.text');
    },
    onTitleSettedManually : function(){
        title.data('manually setted',1);
        notepad.onTitleSetted();
    },
    saveInExtention : function(){
        localStorage.setItem('item_'  + title.val(), textarea.val());
    },
    saveToComputer : function(){

         var text = textarea.val();//.replace(/\n/,'<br/>'),
            link = $('<a>');

         link.attr('download', title.val() + '.docx');   
         link.text( title.val());   
         link.attr('href', 'data:' + 'text/docx' + ';charset=utf-8,' + encodeURIComponent(text));
         //link.appendTo($('body'));
         link[0].click(); 
         //link.remove();
    },
    getFromExtention : function(name){
        return localStorage.getItem('item_'  + name);
    },
    getAllSaved : function(){
        let collect = [];
        for(let i in localStorage){
            if(i.indexOf('item_') === 0 ){
                collect.push(i);
            }
        }
        return collect;
    },
    loadFromStorage: function (){
        let load = $('#files-list').val(),
            text = notepad.getFromExtention(load);

        if(text){
            title.val(load);
            textarea.val(text);
            notepad.diableList();
        }
    }

}

textarea = $('textarea');
title = $('#title');
notepad.init();
