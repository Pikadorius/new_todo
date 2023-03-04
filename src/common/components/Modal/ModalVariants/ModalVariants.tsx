import React from 'react';
import {useAppSelector} from 'common/hooks/hooks';
import DeleteTodoModal from 'common/components/Modal/DeleteTodoModal/DeleteTodoModal';
import DeleteTaskModal from 'common/components/Modal/DeleteTaskModal/DeleteTaskModal';
import CreateTodoModal from 'common/components/Modal/CreateTodoModal/CreateTodoModal';
import CreateTaskModal from 'common/components/Modal/CreateTaskModal/CreateTaskModal';
import UpdateTodoModal from 'common/components/Modal/UpdateTodoModal/UpdateTodoModal';
import UpdateTaskModal from 'common/components/Modal/UpdateTaskModal/UpdateTaskModal';

const ModalVariants = () => {
    const modalType = useAppSelector(state => state.app.modal)
    const modalTodo = useAppSelector(state => state.app.modalTodo)
    const modalTask = useAppSelector(state => state.app.modalTask)

    switch (modalType) {
        case 'deleteTodo': {
            return (
                <DeleteTodoModal item={modalTodo}/>
            )
        }
        case 'deleteTask': {
            return <DeleteTaskModal item={modalTask}/>
        }
        case 'createTodo': {
            return <CreateTodoModal/>
        }
        case 'createTask': {
            return <CreateTaskModal/>
        }
        case 'updateTodo': {
            return <UpdateTodoModal/>
        }
        case 'updateTask': {
            return <UpdateTaskModal/>
        }
        default:
            return <></>
    }
};

export default ModalVariants;