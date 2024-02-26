import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt";
import { signinInput, signupInput } from '@ritiks236/common-app';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

//signup route
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();

    const {success} = signupInput.safeParse(body);

    if(!success){
      c.status(400);
      return c.json({error : 'Incorrect Inputs'})
    }
  
    try{
        const user = await prisma.user.create({
          data:{
            email: body.email,
            password: body.password,
            
          },
          select:{
            id: true
          }
        });
  
    
        
        const token = await sign({id: user.id}, c.env.JWT_SECRET);
        return c.json({
          token: token
        });
    } catch (err) {
      return c.status(403);
    }
    
  })
  
  
  //signin route
  userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);

    if(!success){
      c.status(400);
      return c.json({error : 'Incorrect Inputs'})
    }
  
    const user = await prisma.user.findUnique({
      where:{
        email: body.email,
        password: body.password
      },
      select: {
        id : true
      }
    });
  
    if(!user){
      c.status(403);
      return c.json('Incorrect email and password');
    }
  
    const token = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({
      token: token
    });
})
