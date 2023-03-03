import Tanks from "../models/tank.js";
import mongoose from "mongoose";
import dayjs from 'dayjs'

export const getTanks = async (req, res) => {
    try {
        const tanks = await Tanks.find();

        res.status(200).json(tanks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createTank = async (req, res) => {
    const tank = req.body;
    
    const newTank = new Tanks(tank);


    try {

        if(tank.mileage < 0)  return res.status(404).json({message: "Mileage can't be lesser than 0"})
        
        if(tank.ammoCount < 0) return res.status(404).json({message: "Mileage can't be lesser than 0"})
        
        if(tank.armor[0] < 0 || tank.armor[1] < 0 || tank.armor[2] < 0) return res.status(404).json({message: "Tank armor can't be shorter than 0"})
        
        if(tank.introductionDate > new Date()  || tank.introductionDate < dayjs('1970-01-01') || tank.year > new Date()  || tank.year < dayjs('1900-01-01')) return res.status(404).json({message: "Invalid date"})
        
        await newTank.save()

        res.status(201).json(newTank);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateTank = async (req, res) => {
    const { id: _id } = req.params;
    const tank = req.body;
    tank.updateDate = new Date();

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No tank with that id');

    if(tank.mileage < 0)  return res.status(404).json({message: "Mileage can't be lesser than 0"})
        
    if(tank.ammoCount < 0) return res.status(404).json({message: "Mileage can't be lesser than 0"})
    
    if(tank.armor[0] < 0 || tank.armor[1] < 0 || tank.armor[2] < 0) return res.status(404).json({message: "Tank armor can't be shorter than 0"})
    
    if(tank.introductionDate > new Date()  || tank.introductionDate < dayjs('1970-01-01') || tank.year > new Date()  || tank.year < dayjs('1900-01-01')) return res.status(404).json({message: "Invalid date"})
    

    const oldGame = await Tanks.findById(_id);

    const updatedTank = await Tanks.findByIdAndUpdate(_id, tank, { new: true })
    res.json(updateTank);
}

export const deleteTank = async (req, res) => {
    const {id: _id } = req.params;
    

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No game with that id');

    await Tanks.findByIdAndDelete(_id);

    res.json({message: 'Game deleted successfully'});
    
    
}