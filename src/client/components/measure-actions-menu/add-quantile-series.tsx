/*
 * Copyright 2017-2018 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { Measure } from "../../../common/models/measure/measure";
import { SeriesList } from "../../../common/models/series-list/series-list";
import { QuantileSeries } from "../../../common/models/series/quantile-series";
import { Series } from "../../../common/models/series/series";
import { Unary } from "../../../common/utils/functional/functional";
import { Fn } from "../../../common/utils/general/general";
import { STRINGS } from "../../config/constants";
import { classNames } from "../../utils/dom/dom";
import { SvgIcon } from "../svg-icon/svg-icon";

interface AddQuantileSeriesButtonProps {
  addSeries: Unary<Series, void>;
  appendDirtySeries: Unary<Series, void>;
  measure: Measure;
  series: SeriesList;
  onClose: Fn;
}

export const AddQuantileSeriesButton: React.SFC<AddQuantileSeriesButtonProps> = props => {
  const { series, measure, appendDirtySeries, addSeries, onClose } = props;

  const disabled = !measure.isQuantile();

  function onNewQuantileSeries() {
    if (!disabled) {
      const quantileSeries = QuantileSeries.fromQuantileMeasure(measure);
      if (series.hasSeriesWithKey(quantileSeries.key())) {
        appendDirtySeries(quantileSeries);
      } else {
        addSeries(quantileSeries);
      }
    }
    onClose();
  }

  return <div className={classNames("new-quantile-expression", "action", { disabled })} onClick={onNewQuantileSeries}>
    <SvgIcon svg={require("../../icons/preview-subsplit.svg")} />
    <div className="action-label">{STRINGS.add}</div>
  </div>;
};
