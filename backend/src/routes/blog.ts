import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput, updatePostInput } from "@ritiks236/common-app";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const bookRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

bookRouter.use( async (c, next) => {
    const jwt = c.req.header('Authorization') || "";
  
    const token = jwt.split(' ')[1];
    const payload = await verify(token, c.env.JWT_SECRET);
  
  
    if(!payload){
      c.status(403);
      return c.json('unauthorizes');
    }
    c.set('userId', payload.id)
  
    await next();
  
  });

//post blog
bookRouter.post('/', async(c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const userId = c.get('userId');

    const {success} = createPostInput.safeParse(body);

    if(!success){
      c.status(400);
      return c.json({error : 'Incorrect Inputs'})
    }
    
    try{
      const blog = await prisma.post.create({
        data:{
          title: body.title,
          description: body.description,
          authorId: userId
        }
      });
  
      return c.json({
        message : 'Blog Created Successfully'
      })
    } catch(err){
      console.log(err);
      return c.status(403);
    }
    
  })
  
  bookRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const userId = c.get('userId');
    const body = await c.req.json();
    
    const {success} = updatePostInput.safeParse(body);

    if(!success){
      c.status(400);
      return c.json({error : 'Incorrect Inputs'})
    }
  
    try{
      const updated = await prisma.post.update({
        where:{
          id: body.id,
          authorId: userId
        },
        data:{
          title: body.title,
          description: body.description
        }
      });
  
      return c.text('Updated post');
    } catch(err){
        console.log(err);
        return c.status(404);
    }
  })
  
  bookRouter.get('/allblog', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const userId = c.get('userId');
  
    try{
      const blogs = await prisma.post.findMany({
        where:{
          authorId : userId
        }
      })
  
      return c.json({
        blogs : blogs
      })
  
    } catch(err){
      return c.status(404);
    }
  })
  
  bookRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const id = c.req.param('id');
  
    try{
      const blog = await prisma.post.findUnique({
        where:{
          id : id
        }
      })
  
      return c.json({
        blog : blog
      })
  
    } catch(err){
      return c.status(404);
    }
  })