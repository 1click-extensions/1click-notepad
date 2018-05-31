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
                //console.log(title.data('title setted'))
                if(title.data('title setted')){
                    notepad.saveInExtention();
                }
                if(!title.data('title manually setted') && title.val().length < 25){
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
            $('<div id="files-list"><button type="button" class="chosen"></button><div class="list"></div></div>').appendTo($('.buttons'));
            $('#files-list .chosen').click(function(){
                if(!notepad.selectDisabled){
                    $('#files-list').toggleClass('open');
                }
            })
            $('#files-list').on('click','.remove', function(){
                notepad.removeFile($(this).next().text());
                $(this).closest('.part').remove();
            });
            $('#files-list').on('click','.text', function(){
                $('.chosen').text($(this).text())
                notepad.loadFromStorage($(this).text());
                $('#files-list').removeClass('open');
            });

        }

        notepad.refreshList();
    },
    refreshList : function(){
        var list = $('#files-list .list'),
            button = $('<div type="button" class="part"><button class="text">' + "Load saved file" +"</button></div>");
        list.empty().append(button);
                //list.unbind('change').bind('change', notepad.loadFromStorage);
        let files = notepad.getAllSaved();
        for(let file of files){
            file = file.replace('item_','');
            button.clone().html('<button class="remove">X</button><button class="text">' + file +"</button>").appendTo(list);
        }
        $('#files-list .list .text:first').trigger('click');
        // console.log(" $('#files-list').trigger('change.select2');");
        // $('#files-list').trigger('change.select2');
        // $("#files-list").select2({
        //       templateResult: formatState,
        //       change : function(){
        //         console.log($("#files-list .delete-me"));
        //       }
        //     });

        
        
    },
    enableList : function(){
        notepad.selectDisabled = false;
        $('#files-list').removeClass('disabled');
    },
    diableList : function(){
        notepad.selectDisabled = true;
        $('#files-list').addClass('disabled');
    },
    onTitleSetted : function(){
        title.data('title setted',1);
        //textarea.unbind('keydown.text');
    },
    onTitleSettedManually : function(){
        title.data('title manually setted',1);
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
    removeFile: function(title){
        localStorage.removeItem('item_' + title);
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
    selectDisabled: false,
    loadFromStorage: function (load){
        let /*oad = $('#files-list').val(),*/
            text = notepad.getFromExtention(load);
        console.log(text);
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
