import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Container from "@/app/components/container";
import { notFound } from "next/navigation";
import {
  getAllMemberIds,
  getMemberWithCountryById,
  memberDescriptionToPlainText,
  membersByCountry,
} from "@/lib/data/members";
import MemberDetailView from "./member-detail-view";

export function generateStaticParams() {
  return getAllMemberIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const found = getMemberWithCountryById(id);
  if (!found) return { title: "Member not found" };
  return {
    title: `${found.member.name} | Member organizations | ERA LGBTI`,
    description: memberDescriptionToPlainText(found.member.description).slice(
      0,
      160,
    ),
  };
}

function getRelatedMembers(countryCode, currentId, limit = 4) {
  const country = membersByCountry.find((c) => c.countryCode === countryCode);
  if (!country) return [];
  return country.members.filter((m) => m.id !== currentId).slice(0, limit);
}

export default async function MemberOrganizationPage({ params }) {
  const { id } = await params;
  const found = getMemberWithCountryById(id);
  if (!found) notFound();

  const { member, countryName, countryCode } = found;
  const relatedMembers = getRelatedMembers(countryCode, member.id);

  return (
    <>
      <Navbar />
      <Container>
        <MemberDetailView
          member={member}
          countryName={countryName}
          countryCode={countryCode}
          relatedMembers={relatedMembers}
        />
      </Container>
      <Footer />
    </>
  );
}
