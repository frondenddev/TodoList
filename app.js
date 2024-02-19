// creact list
let todos = [];
// get Dom ele form and input
const addFormNode = document.getElementById("addForm");
const addInputNode = document.getElementById("addInput");
addFormNode.addEventListener('submit', (e)=> {
    e.preventDefault();
    if(addInputNode.value) {
        addTodo(addInputNode.value);
        addInputNode.value = '';
        addInputNode.focus();
    }
});

let addTodo = (addedValue)=> {
    const newTodo = {
        // id ở đây là chủ yếu chuyền vào một hàm random để ko bị trùng lặp nó cũng giống như id 1, 2, 3, 4. i++
        id: Date.now(),
        // label: info đã thêm
        label: addedValue,
        // isDone: kiểm tra có thông tin hay ko
        isDone: false
    };
    // thêm phần tử mới vào đầu mảng và trả về độ dài mảng.
    // ở đây sẽ trả về số lượng phần tử đã thêm vào danh sách.
    todos.unshift(newTodo);
    renderTodos();
};

let renderTodos = ()=> {
    const todoListNode = document.getElementById("todoList");
    todoListNode.innerHTML = '';
    // lặp qua danh sách info
    todos.forEach((todo)=> {
        // Destructuring id, label, isDone, isEditing là các key trong obj todo
        const {id, label, isDone, isEditing} = todo || {};
        // tạo một Dom ele li
        const todoItemNode = document.createElement("li");
        // nếu isDone của obj là false => if isDone là false thì là đúng sẽ nhận done và ngc lại. 
        todoItemNode.className = `todo-item ${isDone ? 'done' : ''}`;
        // thêm số mini s của key id: date.now();
        todoItemNode.id = id;

        // phần thêm text info vào ui
        const labelNode = document.createElement("span");
        labelNode.className = "todo-label";
        labelNode.innerText = label;
        // phần các chức năng delete, edit, done;
        const actionNode = document.createElement("div");
        actionNode.className = "todo-action";
        // handle delete
        const deleteBtnNode = document.createElement("button");
        deleteBtnNode.className = "btn btn-delete";
        deleteBtnNode.innerText = "Delete";
        deleteBtnNode.addEventListener('click', (e)=> {
            e.preventDefault();
            deleteTodo(id);
        })
        // handle edit
        const editBtnNode = document.createElement("button");
        editBtnNode.className = "btn btn-edit";
        editBtnNode.innerText = "Edit";
        editBtnNode.addEventListener('click', (e)=> {
            e.preventDefault();
            toggleEditView(id);
        });
        const doneBtnNode = document.createElement("button");
        doneBtnNode.className = "btn btn-done";
        doneBtnNode.innerText = "Done";
        doneBtnNode.addEventListener('click', (e)=> {
            e.preventDefault();
            updateTodoStatus(id);
        });
        const editInputNode = document.createElement("input");
        editInputNode.className = "input editInput";
        editInputNode.value = label;

        const saveBtnNode = document.createElement("button");
        saveBtnNode.className = "btn";
        saveBtnNode.innerText = "Save";

        const editFormNode = document.createElement("form");
        editFormNode.className = "form editForm";
        editFormNode.addEventListener('submit', (e)=> {
            e.preventDefault();
            if(editInputNode) {
                updateTodoLabel(id, editInputNode.value);
                toggleEditView(id);
                editInputNode.value = "";
            }
        })
        // nếu isEditing đúng thì sẽ hiển thị form sửa editFormNode;
        if(isEditing) {
            // thêm form sửa vào form sửa gồm có nút save và cả form sửa
            editFormNode.appendChild(editInputNode);
            editFormNode.appendChild(saveBtnNode);
            todoItemNode.appendChild(editFormNode);
        } else {
            actionNode.appendChild(deleteBtnNode);
            // khi nhấn done thì done sẽ là false nên sẽ ẩn btn edit
            !isDone && actionNode.appendChild(editBtnNode);
            actionNode.appendChild(doneBtnNode);

            todoItemNode.appendChild(labelNode);
            todoItemNode.appendChild(actionNode);
        }
        todoListNode.appendChild(todoItemNode);
    })
}

let deleteTodo = (id)=> {
    // hàm filter lặp và kiểm tra danh sách đó và trả về một mảng mới có các phần tử là true;
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos();
};
let toggleEditView = (id)=> {
    // lặp danh sách todo bằng map(dùng để tạo ra một mảng mới);
    // ở đây chuyền todo vào hàm map nếu todo.id với id có id bằng nhau thì lấy {...todo, isEditing: !todo.isEditing} và ngc lại
    // trong đó: ...todo => là toán tử rest lấy tất cả các key của obj todo ở trên gồm id, lable, isDone, isEditing
    // isEditing: !todo.isEditting => nếu isEditting true nó sẽ trở thành false, nó như cái toggle, nếu id bằng thì true và ngc lại
    todos = todos.map((todo) => 
        todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo
    );
    renderTodos();
}

let updateTodoStatus = (id)=> {
    todos = todos.map((todo) =>
    todo.id === id ? {...todo, isDone: !todo.isDone} : todo)
    renderTodos(); 
}

let  updateTodoLabel = (id, editedLabel)=> {
    todos = todos.map((todo) => 
    todo.id === id ? {...todo, label: editedLabel} : todo)
    renderTodos();
}