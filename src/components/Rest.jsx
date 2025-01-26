import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Badge} from "@/components/ui/badge.jsx";

export default function Test(){
    return <>
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>bgmi</CardTitle>
                <CardDescription>Manoj</CardDescription>
            </CardHeader>
            <CardContent className='space-y-1'>
                <div className='flex justify-end'>
                    <div className='border bg-primary text-primary-foreground px-2 py-1 rounded-xl rounded-br-none'>
                        <h1 className='font-semibold'>Manoj</h1>
                        <p className='text-sm flex justify-end'>Hi</p>
                    </div>
                </div>
                <div className='flex justify-start'>
                    <div className='border bg-muted px-2 py-1 rounded-xl rounded-bl-none max-w-[70%]'>
                        <h1 className='font-semibold'>Shadcn</h1>
                        <p className='text-sm flex justify-start'>How Are You Doing</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    </>
}