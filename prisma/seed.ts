    import { Prisma, PrismaClient } from "@prisma/client"

    const prisma = new PrismaClient();

    const initialQuiz: Prisma.QuizzyCreateInput[] = [
        {
            question: "Which country",
            correctanswer : 1,
            answerimage : "answer.webp",
            answertext : "Dont know",
            options : ["Nepal", "USA", "China","Korea"]
        }
    ];
async function main() {
    for (const element of initialQuiz) {
        try{
            await prisma.quizzy.create({
                data: element,
            })
        } catch(error: unknown){
            if(error instanceof Prisma.PrismaClientKnownRequestError && error.code==='P2002'){
                console.log("The values need to be unique.")
            }
        };
        }
}
export default main()