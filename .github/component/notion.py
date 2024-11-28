#
#  Copyright 2024 The InfiniFlow Authors. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#
import logging
from abc import ABC
import pandas as pd
from notion_client import Client
from agent.component.base import ComponentBase, ComponentParamBase


class NotionParam(ComponentParamBase):
    """
    Define the Notion component parameters.
    """

    def __init__(self):
        super().__init__()
        self.top_n = 10
        self.api_key = None
        self.database_id = None

    def check(self):
        self.check_positive_integer(self.top_n, "Top N")
        if not self.api_key:
            raise ValueError("Notion API key is required")
        if not self.database_id:
            raise ValueError("Notion database ID is required")


class Notion(ComponentBase, ABC):
    component_name = "Notion"

    def _run(self, history, **kwargs):
        ans = self.get_input()
        ans = " - ".join(ans["content"]) if "content" in ans else ""
        if not ans:
            return Notion.be_output("")

        try:
            notion = Client(auth=self._param.api_key)
            
            # Search in the specified database
            response = notion.databases.query(
                database_id=self._param.database_id,
                filter={
                    "or": [
                        {
                            "property": "title",
                            "rich_text": {
                                "contains": ans
                            }
                        },
                        {
                            "property": "description",
                            "rich_text": {
                                "contains": ans
                            }
                        }
                    ]
                },
                page_size=self._param.top_n
            )

            notion_res = []
            for page in response["results"]:
                title = page["properties"].get("title", {}).get("title", [{}])[0].get("plain_text", "Untitled")
                url = page["url"]
                notion_res.append({
                    "content": f'<a href="{url}">{title}</a>'
                })

        except Exception as e:
            return Notion.be_output("**ERROR**: " + str(e))

        if not notion_res:
            return Notion.be_output("")

        df = pd.DataFrame(notion_res)
        logging.debug(f"df: {df}")
        return df 