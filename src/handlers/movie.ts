import prismaClient from "../helpers/db"

export async function createMovie(req) {
  return await prismaClient.movie.create({
    data: {
      title: req.body.title,
      year: req.body.year,
      director: req.body.director,
      runningTime: req.body.runningTime,
      trailerLink: req.body.trailerLink,
      thumbPath: req.body.thumbPath,
      imdbScore: req.body.imdbScore,
      synopsis: req.body.synopsis,
      categories: {
        connectOrCreate: req.body.categories.map((cat) => {
          return {
            where: { name: cat.name },
            create: { name: cat.name },
          }
        }),
      },
    },
  })
}

export async function getMovies(req) {
  return await prismaClient.movie.findMany({
    skip: +req.query.offset,
    take: +req.query.limit,
    include: {
      categories: {
        select: {
          name: true
        }
      }
    }
  })
}

export async function getMovie(req) {
  return await prismaClient.movie.findUnique({
    where: {
      id: +req.params.id,
    },
    include: {
      categories: {
        select: {
          name: true
        }
      }
    }
  })
}
