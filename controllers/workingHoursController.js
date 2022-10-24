import asyncHandler from "express-async-handler";
import workDays from "../models/working-hours.js";
import user from "../models/user.js";

export const create_workday = asyncHandler(async(req, res) => {
    const User = await user.findById(req.user.id)
    const workingDays = await workDays.findOne({created_by: req.user.id})
    const {day, openingHour, closingHour} = req.body

    const workExists = await workDays.findOne({created_by: req.user.id, "workDays.day": day})
    if(workExists){
        
        res.json({
            message: "work Day already exists with time"
        })
    }else{
        if (User && workingDays) {
            if(workingDays.workDays.length> 7){
                res.json({
                    error: "Workdays cannot exceed seven days"
                })
            }
    
            const updateWork = await workDays.findByIdAndUpdate(workingDays._id, {
                $addToSet: {
                    workDays: [
                        {
                            day,
                            openingHour,
                            closingHour
                        }
                    ]
                }
        
            }, ({new: true, useAndModify: false}))
    
            if(updateWork){
                res.json({
                    status: "ok",
                    message: "Workdays have been updated",
                    data: workingDays
                })
            }
            
        }else{
            const newWork = await workDays.create({
                created_by: req.user.id,
                workDays: [
                    {
                        day,
                        openingHour,
                        closingHour
                    }
                ]
            })
            if (newWork) {
                res.json({
                    status: "ok",
                    message: "Work day has been created successfully",
                    data: newWork
    
                })
            }else{
                res.json({error: "Invalid data nprovide"})
            }
                  
        }
    }

})
