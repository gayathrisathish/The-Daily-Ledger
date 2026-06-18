import { notFound } from "next/navigation";

import { EditionDetails } from "@/components/edition/edition-details";
import { EmptyState } from "@/components/shared/empty-state";
import { getLatestEdition, getMarketSnapshotsByEdition } from "@/lib/data/editions";
import { getByEditionId as getStoriesByEditionId } from "@/lib/data/stories";
import { get } from "@/lib/data/concepts";
import { get as getCompanies } from "@/lib/data/companies";

export default async function TodayPage() {
  const edition = await getLatestEdition();

  if (!edition) {
    return <EmptyState title="No edition available" description="Check back later when a new edition is published." />;
  }

  const [stories, marketSnapshots, concepts, companies] = await Promise.all([
    getStoriesByEditionId(edition.id),
    getMarketSnapshotsByEdition(edition.id),
    get(),
    getCompanies()
  ]);

  return (
    <EditionDetails
      edition={edition}
      stories={stories}
      marketSnapshots={marketSnapshots}
      concept={concepts[0] ?? null}
      companies={companies.slice(0, 4)}
    />
  );
}
