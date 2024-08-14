import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setToDos] = useState([]);
	const [editingIndex, setEditingIndex] = useState(null);
	const [editValue, setEditValue] = useState("");

	const handleAddTodo = () => {
		if (inputValue.trim()) {
			setToDos([...todos, inputValue]);
			setInputValue("");
		}
	};

	const handleEditTodo = (index) => {
		setEditingIndex(index);
		setEditValue(todos[index]);
	};

	const handleSaveEdit = () => {
		if (editValue.trim()) {
			const updatedTodos = todos.map((item, index) =>
				index === editingIndex ? editValue : item
			);
			setToDos(updatedTodos);
			setEditingIndex(null);
			setEditValue("");
		}
	};

	const handleCancelEdit = () => {
		setEditingIndex(null);
		setEditValue("");
	};

	return (
		<div className="container my-5">
			<div className="w-75">
				<h1 className="text-start">Tareas para mi marido <i className="fa-solid fa-heart"></i></h1>

				<ul className="list-group">
					<li className="list-group-item">
						<input
							onChange={(e) => setInputValue(e.target.value)}
							value={inputValue}
							type="text"
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleAddTodo();
								}
							}}
							placeholder="Qué quieres hacer?"
							className="form-control"
						/>
					</li>
					{todos.map((item, index) => (
						<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
							{editingIndex === index ? (
								<>
									<input
										type="text"
										value={editValue}
										onChange={(e) => setEditValue(e.target.value)}
										className="form-control"
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												handleSaveEdit();
											}
										}}
									/>
									<h3 onClick={handleSaveEdit} className="btn save btn-sm"><i className="fa-solid fa-heart"></i></h3>
									<h3 onClick={handleCancelEdit} className="btn cancel btn-sm ml-2">Cancelar</h3>
								</>
							) : (
								<>
									<span className="todo-text">{item}</span>
									<div className="d-flex justify-content-end align-items-center px-3">
										<h4
											className="p-2"
											onClick={() => handleEditTodo(index)}
										>
											Editar
										</h4>
										<h3
											onClick={() => setToDos(todos.filter((_, i) => i !== index))}
										>
											X
										</h3>
									</div>
								</>
							)}
						</li>
					))}
				</ul>
				<div className="text-center tasks mt-3">Total tareas: {todos.length}</div>
			</div>
		</div>
	);
};

export default Home;

