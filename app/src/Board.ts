import * as $ from "jquery";
/**
 * Board
 */
class Board {

    // Posible values to represent board, walls, agent and goal
    static readonly EMPTY_PLACE: number = 0;
    static readonly WALL_BLOCK: number = 1;
    static readonly AGENT: number = 2;
    static readonly GOAL: number = 3;
    static readonly SOLUTION_PATH: number = 4;
    static readonly WAYPOINT_NODE: number = 5;

    // Css classes assigned to each posible value in the board
    static readonly EMPTY_PLACE_CLASS: string = "empty";
    static readonly WALL_BLOCK_CLASS: string = "board-wall-block";
    static readonly AGENT_CLASS: string = "agent";
    static readonly GOAL_CLASS: string = "goal";
    static readonly SOLUTION_PATH_CLASS: string = "solution-path";
    static readonly WAYPOINT_NODE_CLASS: string = "waypoint-node";

    private board_matrix: Array<Array<number>>;

    constructor() {
        this.board_matrix = [[20]];
        for (let i = 0; i < 20; i++) {
            let arr = [20];
            for (let j = 0; j < 20; j++) {
                arr[j] = Board.EMPTY_PLACE;
            }
            this.board_matrix[i] = arr;
        }
    }

    public getBoard() {
        return this.board_matrix;
    }

    public getCssClass(type: number) {
        let css_class = '';
        switch (type) {
            case Board.WALL_BLOCK:
                css_class = Board.WALL_BLOCK_CLASS;
                break;
            case Board.AGENT:
                css_class = Board.AGENT_CLASS;
                break;
            case Board.GOAL:
                css_class = Board.GOAL_CLASS;
                break;
            case Board.SOLUTION_PATH:
                css_class = Board.SOLUTION_PATH_CLASS;
                break;
            case Board.WAYPOINT_NODE:
                css_class = Board.WAYPOINT_NODE_CLASS;
                break;
            default:
                css_class = Board.EMPTY_PLACE_CLASS;
                break;
        }
        return css_class;
    }

    // If save == true, the type will be save in board_matrix.
    public drawPoint(x: number, y: number, type: number, save: boolean, replaceCssClass: boolean) {
        let selector = `td[data-x="${x}"][data-y="${y}"]`;
        let domElement = $(selector);
        if (replaceCssClass) {
            $(domElement).attr("class", this.getCssClass(type));
        } else {
            $(domElement).addClass(this.getCssClass(type));            
        }
        if (save) {
            this.board_matrix[x][y] = type;
        }
    }

    public drawSolutionPath(solutionPath: Array<Array<number>>) {
        solutionPath.forEach(coords => {
            this.drawPoint(coords[0], coords[1], Board.SOLUTION_PATH, false, false);
        });
    }

}

export { Board }