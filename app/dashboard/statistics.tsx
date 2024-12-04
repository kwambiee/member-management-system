"use client"

import { Profile } from "@/components/ui/columns"
import { useState, useEffect } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {getData } from "./page"


  const StatisticCard = () => {
    const [data, setData] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    
    let adminCount = data.filter((profile) => profile.role === "admin").length;
    let memberCount = data.filter((profile) => profile.role === "member").length;
    let totalCount = data.length;

    useEffect(() => {
        getData()
        .then((data) => {
            setData(data)
            setLoading(false)
        })
        .catch((error) => {
            setError(error)
            setLoading(false)
        })
    }, [])

    

    return(
        <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{totalCount}</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        
                        <CardDescription>{memberCount}</CardDescription>
                        
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Admin</CardTitle>
                    </CardHeader>
                    <CardContent>
                        
                        <CardDescription>{adminCount}</CardDescription>
                    </CardContent>
                </Card>
            
        </div>
    )}

  export default StatisticCard;