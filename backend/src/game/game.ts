export class TicTacToe {
	private board: string[];
	public currentPlayer: number;
	public players: string[];
	private signs: string[];
	private logs: string[];

	constructor() {
		this.board = Array(9).fill(null);
		this.currentPlayer = 0;
		this.players = [];
		this.signs = ['X', 'O'];
		this.logs = [];
	}

	public join(playerName: string): string {
		if (this.players.length < 2) {
			this.players.push(playerName);
			console.log(playerName);
			this.logs.push(`${playerName}`);
			return `${playerName} joined as player ${this.players.length}`;
		} else {
			return 'Game is full';
		}
	}

	private isValidMove(index: number): boolean {
		return index >= 0 && index < 9 && this.board[index] === null;
	}

	public makeMove(player: string, index: number): string {
		if (this.players[this.currentPlayer] !== player) {
			return 'Not your turn';
		}

		if (!this.isValidMove(index)) {
			return 'Invalid move';
		}

		const sign = this.signs[this.currentPlayer];
		this.board[index] = sign;

		const logEntry = `${player} made move ${sign} on index ${index + 1}`;
		this.logs.push(logEntry);

		this.currentPlayer = 1 - this.currentPlayer;
		return logEntry;
	}

	public checkWinner() {
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (const [a, b, c] of winningCombinations) {
			if (
				this.board[a] &&
				this.board[a] === this.board[b] &&
				this.board[a] === this.board[c]
			) {
				return this.board[a];
			}
		}
		return null;
	}

	public getLogs(): string[] {
		return this.logs;
	}

	public getBoard(): string[] {
		return this.board;
	}
}
