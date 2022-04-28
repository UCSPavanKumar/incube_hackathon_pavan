
var wordslist = []
function word(id,word)
{
    this.id = id;
    this.word = word;
}
function getAllWords()
{
    document.getElementById("loading").style.display="block";
    $.get('/api/v1/listWords/',function(data,status)
    {
        document.getElementById("loading").style.display="none";
        wordslist = data;
        console.log(wordslist)
    })

}
function clearList(table)
{
    var tab = document.getElementById(table);
    row_len = tab.rows.length
    if(row_len>1)
    {
        for(var i=1;i<row_len;i++)
        {
            tab.deleteRow(i)
        }
    }
    else
    {

    }


}
function listWords()
{   
    clearList('total_words')
    document.getElementById("list_words").style.display="block";
        document.getElementById("update_words").style.display="none";
        document.getElementById("add_words").style.display="none";
        document.getElementById("delete_words").style.display="none";
        document.getElementById("read_words").style.display="none";
        var tab = document.getElementById("total_words");
        clearTable('total_words')
        getAllWords();
        for (var i=0;i<wordslist.length;i++)
        {
            var row = tab.insertRow(-1);
            var cell0 = row.insertCell(0);
            cell0.innerHTML = wordslist[i].id
            var cell1 = row.insertCell(1);
            cell1.innerHTML = wordslist[i].word
        }
        

}

function addWord()
{
    document.getElementById("list_words").style.display="none";
        document.getElementById("update_words").style.display="none";
        document.getElementById("add_words").style.display="block";
        document.getElementById("delete_words").style.display="none";
        document.getElementById("read_words").style.display="none";
}

function deleteWord(id)
{
    if(id==-1)
    {
        document.getElementById("list_words").style.display="none";
        document.getElementById("update_words").style.display="none";
        document.getElementById("add_words").style.display="none";
        document.getElementById("delete_words").style.display="block";
        document.getElementById("read_words").style.display="none";
        var tab = document.getElementById("d_total_words");
        clearTable('d_total_words')
        getAllWords()
        for (var i=0;i<wordslist.length;i++)
        {
            var row = tab.insertRow(-1);
            var cell0 = row.insertCell(0);
            cell0.innerHTML = wordslist[i].id
            var cell1 = row.insertCell(1);
            cell1.innerHTML = wordslist[i].word
            var cell2 = row.insertCell(2);
            cell2.innerHTML = "<button class='btn btn-danger' onclick='deleteWord(this)'>Delete</button>"
        }
    }
    else
    {
        var rowid = id.parentNode.parentNode.rowIndex;
        var tab = document.getElementById("d_total_words");
        var word_id = tab.rows[rowid].cells[0].innerHTML;
        var word = tab.rows[rowid].cells[1].innerHTML;
        var tab = document.getElementById("d_total_words");
      
        $.ajax({
            url: '/api/v1/deleteWord/'+word_id+'/',
            type: 'DELETE',
            success: function(result) {
                alert(result.status)
            }
        });
}
}
function updateWord(id)
    {
        console.log(wordslist)
        if(id==-1)
        {
            document.getElementById("list_words").style.display="none";
            document.getElementById("update_words").style.display="block";
            document.getElementById("add_words").style.display="none";
            document.getElementById("delete_words").style.display="none";
            document.getElementById("read_words").style.display="none";
            var tab = document.getElementById("u_total_words");
            clearTable('u_total_words')
            getAllWords();
            for (var i=0;i<wordslist.length;i++)
            {
                var row = tab.insertRow(-1);
                var cell0 = row.insertCell(0);
                cell0.innerHTML = wordslist[i].id
                var cell1 = row.insertCell(1);
                cell1.innerHTML = wordslist[i].word
                var cell2 = row.insertCell(2);
                cell2.innerHTML ="<input type='text' class='form-control'/>"
                var cell3 = row.insertCell(3);
                cell3.innerHTML = "<button class='btn btn-danger' onclick='updateWord(this)'>Update</button>"
            }
        }
        else{
            var rowid = id.parentNode.parentNode.rowIndex;
            var tab = document.getElementById("u_total_words");
            var word_id = tab.rows[rowid].cells[0].innerHTML;
            var word = tab.rows[rowid].cells[2].children[0].value
    
            $.post( "/api/v1/updateWord/"+word_id+"/", { id: word_id, word: word } )
                    .done(function( data ) {
                        if(data.id == word_id)
                        {
                            alert('Updated');
                        }
                        });
        
                    }

    }

    function readWord(id)
    {
        console.log(wordslist)
        if(id==-1)
        {
            document.getElementById("list_words").style.display="none";
            document.getElementById("update_words").style.display="none";
            document.getElementById("add_words").style.display="none";
            document.getElementById("delete_words").style.display="none";
            document.getElementById("read_words").style.display="block";
            document.getElementById("r_total_words").style.display="none";
            
           
        }
        else{
        
            var word = document.getElementById("word").value
    
            $.get( "/api/v1/readWord/"+word+"/" )
                    .done(function( data ) {
                      console.log(data)
                        
                    if ('status' in data)
                    {
                        alert(data.status)
                    }
                    else
                    {
                        document.getElementById("r_total_words").style.display="block";
                        var tab = document.getElementById("r_total_words");
                    for (var i=0;i<data.length;i++)
                    {
                        var row = tab.insertRow(-1);
                        var cell0 = row.insertCell(0);
                        cell0.innerHTML = data[i].id
                        var cell1 = row.insertCell(1);
                        cell1.innerHTML = data[i].word
                    }
                }
                        });
        
                    }

    }

function clearTable(id)
{
    var rowlength = document.getElementById(id).rowlength;
    for (var i=1;i<rowlength;i++)
    {
        document.getElementById(id).deleteRow(i);
    }
}