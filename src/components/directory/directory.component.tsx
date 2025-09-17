import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import { Section, RootState } from '../../types/redux.types';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

// Props received from Redux connect
type DirectoryProps = ConnectedProps<typeof connector>;

// Directory component - displays the main menu categories on the homepage
const Directory: FC<DirectoryProps> = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, title, imageUrl, linkUrl, size }) => (
      <MenuItem
        key={id}
        title={title}
        imageUrl={imageUrl}
        linkUrl={linkUrl}
        size={size || ''}
      />
    ))}
  </div>
);

// Maps Redux state to component props using reselect
const mapStateToProps = createStructuredSelector<
  RootState,
  {
    sections: Section[];
  }
>({
  sections: selectDirectorySections,
});

// Create connector
const connector = connect(mapStateToProps);

export default connector(Directory);
