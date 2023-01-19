// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Taxi {
    //string public name = "Edson";

    struct Viaje {
        uint id;
        string origen;
        string destino;
        bool completed;
    }

    event ViajeCreated (
        uint id,
        string origen,
        string destino,
        bool completed
    );

    event ViajeToggled (
        uint id,
        bool completed
    );

    mapping(address => mapping(uint => Viaje)) public viajes;
    mapping(address => uint) public viajesCount;


    constructor() {
        createViaje("origen", "destino");
    }

    function createViaje(string memory _origen, string memory _destino) public {
        uint viajeCount = viajesCount[msg.sender];
        viajes[msg.sender][viajeCount] = Viaje(viajeCount, _origen, _destino, false);
        emit ViajeCreated(viajeCount, _origen, _destino, false);
        viajesCount[msg.sender]++;
    }

    function toggleCompleted(uint _id) public {
        Viaje memory viaje = viajes[msg.sender][_id];
        viaje.completed = !viaje.completed;
        viajes[msg.sender][_id] = viaje;
        emit ViajeToggled(_id, viaje.completed);
    }
}