/**
 * 마이페이지 세부페이지
 */
// import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import BreadBoxSection from './BreadBoxSection';
import BookmarkIntroductionSection from './BookmarkIntroductionSection';
import BakeryIntroductionSection from './BakeryIntroductionSection';
import RecipeIntroductionSection from './RecipeIntroductionSection';

export default function DynamicSection() {
  const { section } = useParams();

  switch (section) {
    // case 'breadbox':
    //   return <BreadBoxSection />;
    case 'breadbox':
      return <BookmarkIntroductionSection />;
    case 'bakery-introduction':
      return <BakeryIntroductionSection />;
    case 'recipe-introduction':
      return <RecipeIntroductionSection />;
    default:
      return null;
  }
}
