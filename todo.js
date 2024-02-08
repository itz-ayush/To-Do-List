let tasks=[];
const tasksList=document.getElementById('list');
const addTaskInput=document.getElementById('add');
const tasksCounter=document.getElementById('task-counter');

function handleClickListener(e)
{
    const target=e.target;
    if(target.className==='delete')
    {
        const taskid=target.dataset.id;
        deletetask(taskid);
        return;
    }
    else if(target.className==='custom-checkbox')
    {
        const taskid=target.dataset.id;
        toggleTask(taskid);
        return;
    }
}
function addTaskToDOM(task)
{
    const li=document.createElement('li');
    li.innerHTML=`
        <input type="checkbox" id="${task.id}" ${task.done?'checked':''} 
        class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="https://w7.pngwing.com/pngs/429/649/png-transparent-button-icon-delete-button-text-sign-signage.png" class="delete" data-id="${task.id}"/>
        `;
    tasksList.append(li);
}

function renderlist()
{
tasksList.innerHTML='';
for(let i=0;i<tasks.length;i++)
{
    addTaskToDOM(tasks[i]);
}
    tasksCounter.innerHTML=tasks.length;
}


function toggleTask(taskid)
{
    const task=tasks.filter(function(task)
    {
        return task.id==taskid;
    });
        if(task.length>0)
        {
            const currtask=task[0];
            currtask.done=!currtask.done;
            renderlist();
            shownotification('Task toggled successfully');
            return;
        }
        shownotification('Couldnot toggle the task'); 

}

function deletetask(taskid)
{
    const newTasks=tasks.filter(function(task)
    {
        return task.id!==taskid
    });
    tasks=newTasks;
    renderlist();
    shownotification('Task deleted successfully');
}

function addtask(task)
{
    if(task)
    {
        tasks.push(task);
        renderlist();
        shownotification('Task added successfully');
        return;
    }
    shownotification('Task cannot be added');
}

function shownotification(text)
{
    alert(text);
}
function handleInput(e)
{
    if(e.key=='Enter')
    {const text=e.target.value;
    if(!text)
    {
        shownotification("Kindly Enter the task first!");
        return;
    }
    const task={
        text:text,
        id:Date.now().toString(),
        done:false
    }

    e.target.value='';
    addtask(task);
    }
}
addTaskInput.addEventListener('keyup',handleInput)
document.addEventListener('click',handleClickListener);