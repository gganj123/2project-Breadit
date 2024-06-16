import ButtonCategory from '../../components/atoms/links/LinkCategory';

type CategoryProps = {
  go: string;
  src: string;
  categoryName: string;
};

const MainCategories = ({ go, src, categoryName }: CategoryProps) => {
  return (
    <li>
      <img src={src} />
      <ButtonCategory
        go={`${go}?category=${categoryName}`}
        categoryName={categoryName}
      />
    </li>
  );
};

export default MainCategories;
