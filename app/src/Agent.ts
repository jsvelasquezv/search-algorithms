import { Board } from "./Board";
/**
 * Agent
 */
class Agent {
    
    public bresenham(board: Board, x0: number, y0: number, x1: number, y1 :number) {
        let x: number,
            y: number,
            dx: number,
            dy: number,
            p: number,
            incE: number,
            incNE: number,
            stepX: number,
            stepY: number,
            path: Array<Array<number>>;

        // Determinate wich point would be used to start and wich to finish
        dx = (x1 - x0);
        dy = (y1 - y0);

        if (dy < 0) {
            dy = -dy;
            stepY = -1;
        } else {
            stepY = 1;
        }

        if (dx < 0) {
            dx = -dx;
            stepX = -1;
        } else {
            stepX = 1;
        }

        x = x0;
        y = y0;
        // board.drawPoint(x, y, Board.WALL_BLOCK, false);
        path = [[x,y]];

        if (dx > dy) {
            p = 2 * dy - dx;
            incE = 2 * dy;
            incNE = 2 * (dy - dx);
            while (x != x1) {
                x = x + stepX;
                if (p < 0) {
                    p = p + incE;
                } else {
                    y = y + stepY;
                    p = p + incNE;
                }
                // board.drawPoint(x, y, Board.WALL_BLOCK, false);
                path.push([x,y]);
            }
        } else {
            p = 2 * dx - dy;
            incE = 2 * dx;
            incNE = 2 * (dx - dy);
            while (y != y1) {
                y = y + stepY;
                if (p < 0) {
                    p = p + incE;
                } else {
                    x = x + stepX;
                    p = p + incNE;
                }
                // board.drawPoint(x, y, Board.WALL_BLOCK, false);
                path.push([x,y]);                 
            }
        }
        // console.log(path);
        return path;
    }

    public wallTracing(board: Board) {
        let board_matrix = board.getBoard();
        let agentCoords = [];
        let goalCoords = [];
        let obstacule = false;
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                if (board_matrix[i][j] == Board.AGENT) {
                    agentCoords = [i,j];
                }
                if (board_matrix[i][j] == Board.GOAL) {
                    goalCoords = [i,j];
                }
            }
        }
        let path = this.bresenham(board, agentCoords[0], agentCoords[1], goalCoords[0], goalCoords[1])
        for (let i = 0; i < path.length; i++) {
            let point = path[i];
            if (board_matrix[point[0]][point[1]] == Board.WALL_BLOCK) {
                obstacule = true;
            }
        }
        // console.log(obstacule);
    }

    public moveAgent() {
        
    }

    public calculateGoal() {

    }
}

export { Agent }