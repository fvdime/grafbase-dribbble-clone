import { UserProfile, ProjectInterface } from '@/common.types';
import { getUserProjects } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {
  userId: string;
  projectId: string;
}

const RelatedProjects = async ({ userId, projectId } : Props) => {

  const result = await getUserProjects(userId) as { user?: UserProfile }

  //we r filtering the projects bc we dont wanna show same thing that already shows
  const filteredProjects = result?.user?.projects?.edges?.filter(({node}: { node: ProjectInterface }) => node?.id !== projectId)

  if(filteredProjects?.length === 0 ) return null;

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className='text-base font-bold'>More by {result?.user?.name}</p>
        <Link 
        href={`/profile/${result?.user?.id}`}
        className='text-primary-purple text-base'
        >
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {filteredProjects?.map(({ node }: { node: ProjectInterface }) => (
            <Link 
              href={`/project/${node?.id}`}
              className='flexCenter group relative w-full h-full'>
                <Image
                  src={node?.image}
                  width={414}
                  height={314}
                  className='w-full h-full object-cover rounded-2xl'
                  alt='project image'
                />

                <div className="hidden group-hover:flex related_project-card_title">
                  <p className="w-full">{node?.title}</p>
                </div>
              </Link>
          ))}
      </div>
    </section>
  )
}

export default RelatedProjects