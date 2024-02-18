import Image from 'next/image'

export default function Footer() {
	return (
		<footer className='w-full bg-zinc-700 mt-4'>
			<div className='max-w-[1440px] mx-auto w-full flex flex-col items-center'>
				<h1 className='text-center p-8 font-medium text-zinc-200 tracking-wide'>
					Desenvolvedor João Pedro
				</h1>

				<div className='flex gap-4'>
					<a href='https://github.com/JoaoPedro-26'>
						<Image width={48} height={48} src='https://pngimg.com/uploads/github/github_PNG1.png' alt='github-logo' />
					</a>
					<a href='https://www.linkedin.com/in/jo%C3%A3o-pedro-santana-092a7b105/'>
						<Image width={48} height={48} src='https://pngimg.com/uploads/linkedIn/linkedIn_PNG2.png' alt='logo-linkedin' />
					</a>
					<a href='mailto:joaopedro2656@outlook.com'>
						<Image width={48} height={48} src='https://pngimg.com/uploads/gmail_logo/gmail_logo_PNG1.png' alt='email-logo' />
					</a>
				</div>

				<h1 className='text-center p-8 font-medium text-zinc-200 tracking-wide'>
					Todos os direitos reservados.
				</h1>
			</div>
		</footer>
	)
}