import { Board } from "./Board";
/**
 * Agent
 */
class Agent {
    
    public static readonly LEFT_DIRECTION = 2;
    public static readonly RIGHT_DIRECTION = 6;
    public static readonly FRONT_DIRECTION = 4;
    public static readonly BACK_DIRECTION = 8;

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
        let solutionPath = [];
        let direction = Agent.FRONT_DIRECTION;    
        let contador = 0;
        let path = this.bresenham(board, agentCoords[0], agentCoords[1], goalCoords[0], goalCoords[1])
        for (let i = 0; i < path.length; i++) {
            let point = path[i];
            if (board_matrix[point[0]][point[1]] == Board.WALL_BLOCK) {
                obstacule = true;
            }
        }
        if(obstacule == false) {
            solutionPath = path;
        }
        while (obstacule) {
            let r = agentCoords[0];
            let c = agentCoords[1];
                if (direction == Agent.FRONT_DIRECTION) {
                    if (board_matrix[r-1][c] == Board.EMPTY_PLACE) {
                        agentCoords[0] --;
                        direction = Agent.LEFT_DIRECTION;
                    } else if (board_matrix[r][c+1] == Board.EMPTY_PLACE) {
                        agentCoords[1] ++;
                        direction = Agent.FRONT_DIRECTION;
                    } else if (board_matrix[r+1][c] == Board.EMPTY_PLACE) {
                        agentCoords[0] ++;
                        direction = Agent.RIGHT_DIRECTION;
                    } else if (board_matrix[r][c-1] == Board.EMPTY_PLACE) {
                        agentCoords[1] --;
                        direction = Agent.BACK_DIRECTION;
                    }
                } else if (direction == Agent.RIGHT_DIRECTION) {
                    if (board_matrix[r][c+1] == Board.EMPTY_PLACE) {
                        agentCoords[1] ++;
                        direction = Agent.FRONT_DIRECTION;
                    } else if (board_matrix[r+1][c] == Board.EMPTY_PLACE) {
                        agentCoords[0] ++;
                        direction = Agent.RIGHT_DIRECTION;
                    } else if (board_matrix[r][c-1] == Board.EMPTY_PLACE) {
                        agentCoords[1] --;
                        direction = Agent.BACK_DIRECTION;
                    } else if (board_matrix[r-1][c] == Board.EMPTY_PLACE) {
                        agentCoords[0] --;
                        direction = Agent.LEFT_DIRECTION;
                    }
                } else if (direction == Agent.BACK_DIRECTION) {
                    if (board_matrix[r+1][c] == Board.EMPTY_PLACE) {
                        agentCoords[0] ++;
                        direction = Agent.RIGHT_DIRECTION;
                    } else if (board_matrix[r][c-1] == Board.EMPTY_PLACE) {
                        agentCoords[1] --;
                        direction = Agent.BACK_DIRECTION;
                    } else if (board_matrix[r-1][c] == Board.EMPTY_PLACE) {
                        agentCoords[0] --;
                        direction = Agent.LEFT_DIRECTION;
                    } else if (board_matrix[r][c+1] == Board.EMPTY_PLACE) {
                        agentCoords[1] ++;
                        direction = Agent.FRONT_DIRECTION;
                    }
                } else if (direction == Agent.LEFT_DIRECTION) {
                    if (board_matrix[r][c-1] == Board.EMPTY_PLACE) {
                        agentCoords[1] --;
                        direction = Agent.BACK_DIRECTION;
                    } else if (board_matrix[r-1][c] == Board.EMPTY_PLACE) {
                        agentCoords[0] --;
                        direction = Agent.LEFT_DIRECTION;
                    } else if (board_matrix[r][c+1] == Board.EMPTY_PLACE) {
                        agentCoords[1] ++;
                        direction = Agent.FRONT_DIRECTION;
                    } else if (board_matrix[r+1][c] == Board.EMPTY_PLACE) {
                        agentCoords[0] ++;
                        direction = Agent.RIGHT_DIRECTION;
                    }
                }
                // console.log(r,c);
                solutionPath.push([r,c]);            
                // board.drawPoint(r, c, Board.SOLUTION_PATH, false);
                path = this.bresenham(board, agentCoords[0], agentCoords[1], goalCoords[0], goalCoords[1]);
                let localObstacule = true;
                for (let i = 0; i < path.length; i++) {
                    let point = path[i];
                    if (board_matrix[point[0]][point[1]] != Board.WALL_BLOCK) {
                        localObstacule = localObstacule && true;
                    } else {
                        localObstacule = localObstacule && false;
                    }
                }
                if (localObstacule) {
                    path.forEach(point => {
                        solutionPath.push(point);
                    });
                    obstacule = false
                } else {
                    obstacule = true;
                }
                
            }
            // console.log(solutionPath);
            // solutionPath.forEach(coords => {
            //     board.drawPoint(coords[0], coords[1], Board.SOLUTION_PATH, false);
            // });
            return solutionPath;
        }

        public waypointNavigation(board: Board) {
            let board_matrix = board.getBoard();
            let nodeList = [];
            let agentCoords = [];
            let goalCoords = [];
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 20; j++) {
                    let element = board_matrix[i][j];
                    if (element == Board.WAYPOINT_NODE) {
                        nodeList.push([i,j]);
                    }
                    if (element == Board.AGENT) {
                        agentCoords = [i,j];
                    }
                    if (element == Board.GOAL) {
                        goalCoords = [i,j];
                    }
                }
            }
            let goalNode = [];
            for (let i = 0; i < nodeList.length; i++) {
                let path = this.bresenham(board, nodeList[i][0], nodeList[i][1], goalCoords[0], goalCoords[1]);
                if (!this.hasCollitions(path, board)) {
                    goalNode = nodeList[i];
                }
            }
            let agentNode = [];
            for (let i = 0; i < nodeList.length; i++) {
                let path = this.bresenham(board, nodeList[i][0], nodeList[i][1], agentCoords[0], agentCoords[1]);
                if (!this.hasCollitions(path, board)) {
                    goalNode = nodeList[i];
                }
            }
            let precalculatedPaths = [];
            for (let i = 0; i < nodeList.length; i++) {
                precalculatedPaths.push(this.findNodeConections(board, nodeList[i],nodeList));
            }
            precalculatedPaths.forEach(nodeConnection => {
                nodeConnection.connections.forEach(point => {
                    board.drawPoint(point[0], point[1], Board.SOLUTION_PATH, false, false);
                });
            });
        }

        public findNodeConections(board: Board, startingNode: Array<number>, nodeList: Array<Array<number>>) {
            let conectingNodes = {node: startingNode, connections: []};
            let connections = [];
            nodeList.forEach(node => {
                let path = this.bresenham(board, node[0], node[1], startingNode[0], startingNode[1]);
                if (!this.hasCollitions(path, board)) {
                    connections.push(node);
                }
            });
            conectingNodes.connections = connections;
            return conectingNodes;
        }

        public hasCollitions(path: Array<Array<number>>, board: Board) {
            let board_matrix = board.getBoard();
            let collisions = true;
            for (let i = 0; i < path.length; i++) {
                let coords = path[i];
                if (board_matrix[coords[0]][coords[1]] != Board.WALL_BLOCK) {
                    collisions = collisions && true;
                } else {
                    collisions = collisions && false;
                }
            }
            return !collisions;
        }
}

export { Agent }