// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useMemo } from 'react';
import { FontWeights } from '@uifabric/styling';
import { FontSizes } from '@uifabric/fluent-theme';
import formatMessage from 'format-message';
import { UIOptions, JSONSchema7 } from '@bfc/extension';

import { EditableField } from '../fields/EditableField';
import { Link } from '../Link';

import { title as styles } from './styles';

interface FormTitleProps {
  description?: string;
  formData: any;
  id: string;
  onChange: ($designer: object) => void;
  schema: JSONSchema7;
  title?: string;
  uiOptions?: UIOptions;
}

const FormTitle: React.FC<FormTitleProps> = (props) => {
  const { description, schema, formData, uiOptions = {} } = props;

  const handleTitleChange = (newTitle?: string): void => {
    props.onChange({
      ...formData.$designer,
      name: newTitle,
    });
  };

  const uiLabel = typeof uiOptions?.label === 'function' ? uiOptions.label(formData) : uiOptions.label;
  const uiSubtitle = typeof uiOptions?.subtitle === 'function' ? uiOptions.subtitle(formData) : uiOptions.subtitle;
  const initialValue = useMemo(() => {
    const designerName = formData.$designer?.name;

    return designerName || uiLabel || schema.title;
  }, [formData.$designer?.name, uiLabel, schema.title]);

  const getHelpLinkLabel = (): string => {
    return (uiLabel || schema.title || '').toLowerCase();
  };

  const getSubTitle = (): string => {
    return uiSubtitle || uiLabel || formData.$kind;
  };

  const getDescription = (): string => {
    const { description: descriptionOverride } = uiOptions;

    if (descriptionOverride) {
      if (typeof descriptionOverride === 'function') {
        const result = descriptionOverride(formData);

        if (result) {
          return result;
        }
      } else {
        return descriptionOverride;
      }
    }

    return description || schema.description || '';
  };

  return uiLabel !== false ? (
    <div css={styles.container} id={props.id}>
      <div>
        <EditableField
          ariaLabel={formatMessage('form title')}
          depth={0}
          fontSize={FontSizes.size20}
          id="form-title"
          name="$designer.name"
          schema={{}}
          styles={{
            field: { fontWeight: FontWeights.semibold },
            root: { margin: '5px 0 7px -9px' },
          }}
          uiOptions={{}}
          value={initialValue}
          onChange={handleTitleChange}
        />
        <p css={styles.subtitle}>{getSubTitle()}</p>
        <p css={styles.description}>
          {getDescription()}
          {uiOptions?.helpLink && (
            <React.Fragment>
              <br />
              <br />
              <Link
                aria-label={formatMessage('Learn more about {title}', { title: getHelpLinkLabel() })}
                href={uiOptions?.helpLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                {formatMessage('Learn more')}
              </Link>
            </React.Fragment>
          )}
        </p>
      </div>
      {props.children}
    </div>
  ) : null;
};

export default FormTitle;
