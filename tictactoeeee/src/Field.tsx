import { CogIcon, XMarkIcon } from '@heroicons/react/24/outline';

import axios from 'axios';

export default function Field({
	index,
	icon,
	canMove,
	setCanMove,
	fieldClick,
}: {
	index: number;
	icon?: string | null;
	canMove: boolean;
	setCanMove: (value: boolean) => void;
	fieldClick: () => void;
}) {
	const makeMove = async () => {
		if (!canMove) {
			return;
		}
    
		const response = await axios.post('http://localhost:3000/move', {
			player: localStorage.getItem('playerName'),
			index: index,
			sign: 'X',
    });

    setCanMove(false);

		console.log(response);
		fieldClick();
	};

	return (
		<div
			className={`size-20 border-slate-200 border rounded-lg flex justify-center items-center ${
				!icon && 'cursor-pointer'
			}`}
			onClick={() => makeMove()}
		>
			{icon && icon === 'O' && (
				<div className="text-5xl">
					<CogIcon className="size-10"></CogIcon>
				</div>
			)}

			{icon && icon === 'X' && (
				<div className="text-5xl">
					<XMarkIcon className="size-10"></XMarkIcon>
				</div>
			)}
		</div>
	);
}
