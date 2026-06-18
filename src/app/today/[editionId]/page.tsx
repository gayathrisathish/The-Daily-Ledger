import { notFound } from "next/navigation";

import { getById } from "@/lib/data/editions";
import { getByEditionId as getStoriesByEditionId } from "@/lib/data/stories";
import { getByEditionId as getConceptsByEditionId } from "@/lib/data/concepts";
import { getByEditionId as getCompaniesByEditionId } from "@/lib/data/companies";
import { getMarketSnapshotsByEdition } from "@/lib/data/editions";
import { EditionDetails } from "@/components/edition/edition-details";

interface EditionPageProps {
  params: { editionId: string };
}

export default async function EditionPage({ params }: EditionPageProps) {
  const edition = await getById(params.editionId);

  if (!edition) {
    notFound();
  }

  const stories = await getStoriesByEditionId(edition.id);
  const concepts = await getConceptsByEditionId(edition.id);
  const companies = await getCompaniesByEditionId(edition.id);
  const marketSnapshots = await getMarketSnapshotsByEdition(edition.id);

  return (
    <EditionDetails
      edition={edition}
      stories={stories}
      concept={concepts[0]}
      companies={companies}
      marketSnapshots={marketSnapshots}
    />
  );
}
