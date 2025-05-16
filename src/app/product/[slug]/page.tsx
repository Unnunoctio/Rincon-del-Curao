import { getAllSlugs, getProductTitle } from '@/graphql/requests';
import type { Metadata } from 'next';

interface Props {
	params: {
		slug: string;
	};
}

export const dynamicParams = false;

export async function generateStaticParams() {
	const slugs = await getAllSlugs();

	return slugs.map((slug) => ({
		slug: slug,
	}));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = params;

	const title = await getProductTitle(slug);
	return {
		title: title,
	};
}

export default async function ProductPage({ params }: Props) {
	const { slug } = params;

	return (
		<div className="flex flex-col gap-6 w-full max-w-page-width">
			<h1>{slug}</h1>
		</div>
	);
}
