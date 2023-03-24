import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('Todo is rendered', ()=> {
    let deleteClicked = false;
    let doneClicked = false;

    const todo = {
        text: 'testing todo',
        done: false
    };

    const onClickDelete = () => deleteClicked = true;
    const onClickComplete = () => doneClicked = true;

    render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />)
    

    const element = screen.getByText('testing todo');

    expect(element).toBeDefined();
})