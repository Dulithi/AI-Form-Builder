import { Button } from '@/components/ui/button';
import { Crown, LibraryBig, LineChart, MessageSquare, SquarePlus } from 'lucide-react'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs';
import { forms } from '@/configs/schema';
import { desc, eq } from 'drizzle-orm';


function SideNav() {

    const {user} = useUser();
    const [formListLength, setFormListLength] = useState(0);

    const [formPercentage, setFormPercentage] = useState(0);

    useEffect(()=>{
        user && getFormList();
    }, [user]);

    const getFormList = async () => {
        const result = await db.select().from(forms)
        .where(eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(forms.id));
        setFormListLength(result.length);

    }

    useEffect(()=> {
        setFormPercentage((formListLength/3)*100);
    }, [formListLength])

    const menuList=[
        {
            id:1,
            name: "My Forms",
            icon: LibraryBig,
            path: "/dashboard"
        },
        {
            id:2,
            name: "Responses",
            icon: MessageSquare,
            path: "/dashboard/responses"
        },
        {
            id:3,
            name: "Analytics",
            icon: LineChart,
            path: "/dashboard/analytics"
        },
        {
            id:4,
            name: "Upgrade",
            icon: Crown,
            path: "/dashboard/upgrade"
        },
        
    ];

    const path = usePathname();

    useEffect(() => {
        console.log(path==="/dashboard");
    }, [path])

  return (
    <div className='h-screen shadow-md border-e'>
        <div className='p-8'>
            {menuList.map((item) => {
                return (
                    <Link
                        href={item.path} 
                        key={item.id} 
                        className={`flex item-center gap-3 p-4 m-3 hover:bg-primary hover:rounded-lg hover:text-white hover:cursor-pointer ${path==item.path && "bg-primary text-white rounded-lg"}`
                        }
                    >
                        <item.icon/>
                        {item.name}
                    </Link>
                );
            })}
        </div>
            <div className='flex p-10 bottom-0 fixed flex-col gap-6 items-center'>
                <Button className="gap-3 px-8 py-6">
                        <SquarePlus />
                        Create Form
                </Button>
                <div className="w-44">
                <Progress value={formPercentage} />
                <h2 className="text-sm pt-2 text-gray-500"><strong>{formListLength}</strong> out of <strong>3</strong> forms created</h2>
                <p className="text-xs pt-2 text-gray-500">Upgrade for unlimited forms!</p>
                </div>
            </div>
            
    </div>
  )
}

export default SideNav