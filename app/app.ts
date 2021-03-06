import * as $ from "jquery";
import { Board } from "./src/Board";
import { Agent } from "./src/Agent";

let board = new Board();
let agent = new Agent();
let solutionPath = [];

$(document).on('click', "button[data-role='erase-cell']", function(){
    $('td').off('click');
    $('td').on('click', function() {
        let x = $(this).data('x');
        let y = $(this).data('y');
        board.drawPoint(x, y, Board.EMPTY_PLACE, true, true);
    });
});

$(document).on('click', "button[data-role='place-walls']", function(){
    // agent.bresenham(board, 0, 0, 3, 6);
    $('td').off('click');
    $('td').on('click', function() {
        let x = $(this).data('x');
        let y = $(this).data('y');
        board.drawPoint(x, y, Board.WALL_BLOCK, true, true);
    });

});

$(document).on('click', "button[data-role='place-agent']", function(){
    $('td').off('click');
    $('td').on('click', function() {
        let x = $(this).data('x');
        let y = $(this).data('y');
        board.drawPoint(x, y, Board.AGENT, true, true);
    });
});

$(document).on('click', "button[data-role='place-goal']", function(){
    $('td').off('click');
    $('td').on('click', function() {
        let x = $(this).data('x');
        let y = $(this).data('y');
        board.drawPoint(x, y, Board.GOAL, true, true);
    });
});

$(document).on('click', "button[data-role='place-node']", function(){
    $('td').off('click');
    $('td').on('click', function() {
        let x = $(this).data('x');
        let y = $(this).data('y');
        board.drawPoint(x, y, Board.WAYPOINT_NODE, true, true);
    });
});

$(document).on('click', "button[data-role='wall-tracing']", function(){
    solutionPath = agent.wallTracing(board);
    board.drawSolutionPath(solutionPath);
});

$(document).on('click', "button[data-role='waypoint-navigation']", function(){
    agent.waypointNavigation(board);
});