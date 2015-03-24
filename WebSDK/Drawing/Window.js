"use strict";

/**
 * Copyright 2014 the HtmlGoBoard project authors.
 * All rights reserved.
 * Project  WebSDK
 * Author   Ilya Kirillov
 * Date     13.12.14
 * Time     1:13
 */

function CDrawingWindow()
{
    this.HtmlElement =
    {
        Control      : null,
        InnerDiv     : null,
        InnerControl : null,
        CloseButton  : null,
        Caption      : null,
        CaptionText  : null,

        HandlerL     : null,
        HandlerR     : null,
        HandlerB     : null,
        HandlerT     : null,
        HandlerLT    : null,
        HandlerRT    : null,
        HandlerLB    : null,
        HandlerRB    : null
    };

    this.m_oOuterBorderColor = new CColor(166, 166, 166, 255);
    this.m_oInnerBorderColor = new CColor(185, 185, 185, 255);
    this.m_oBackColor        = new CColor(217, 217, 217, 255);

    this.m_nW = -1;
    this.m_nH = -1;

    var oThis = this;

    this.private_OnDragLeftHandler = function()
    {
        var CurLeft     = parseInt(oThis.HtmlElement.Control.HtmlElement.style.left);
        var CurWidth    = parseInt(oThis.HtmlElement.Control.HtmlElement.style.width);
        var LeftHandler = parseInt(oThis.HtmlElement.HandlerL.style.left);

        if (CurWidth - LeftHandler < 60)
        {
            oThis.HtmlElement.HandlerL.style.left = "0px";
        }
        else
        {
            oThis.HtmlElement.Control.HtmlElement.style.left = CurLeft + LeftHandler + "px";
            oThis.HtmlElement.Control.HtmlElement.style.width = CurWidth - LeftHandler + "px";
            oThis.HtmlElement.HandlerL.style.left = "0px";
        }
        oThis.Update_Size();
    };
    this.private_OnDragRightHandler = function()
    {
        var CurWidth    = parseInt(oThis.HtmlElement.Control.HtmlElement.style.width);
        var LeftHandler = parseInt(oThis.HtmlElement.HandlerR.style.left);

        var Diff = (LeftHandler + 6 - CurWidth);

        if (CurWidth + Diff < 60)
        {
            oThis.HtmlElement.HandlerR.style.left = CurWidth - 6 + "px";
            return;
        }

        oThis.HtmlElement.Control.HtmlElement.style.width = CurWidth + Diff + "px";
        oThis.HtmlElement.HandlerR.style.left = CurWidth + Diff - 6 + "px";
        oThis.Update_Size();
    };
    this.private_OnDragBottomHandler = function()
    {
        var CurHeight    = parseInt(oThis.HtmlElement.Control.HtmlElement.style.height);
        var TopHandler = parseInt(oThis.HtmlElement.HandlerB.style.top);

        var Diff = (TopHandler + 6 - CurHeight);

        if (CurHeight + Diff < 60)
        {
            oThis.HtmlElement.HandlerB.style.top = CurHeight - 6 + "px";
            return;
        }

        oThis.HtmlElement.Control.HtmlElement.style.height = CurHeight + Diff + "px";
        oThis.HtmlElement.HandlerB.style.top = CurHeight + Diff - 6 + "px";
        oThis.Update_Size();
    };
    this.private_OnDragTopHandler = function()
    {
        var CurTop     = parseInt(oThis.HtmlElement.Control.HtmlElement.style.top);
        var CurHeight  = parseInt(oThis.HtmlElement.Control.HtmlElement.style.height);
        var TopHandler = parseInt(oThis.HtmlElement.HandlerT.style.top);

        if (CurHeight - TopHandler < 60)
        {
            oThis.HtmlElement.HandlerT.style.top = "0px";
            return;
        }

        oThis.HtmlElement.Control.HtmlElement.style.top    = CurTop  + TopHandler + "px";
        oThis.HtmlElement.Control.HtmlElement.style.height = CurHeight - TopHandler + "px";
        oThis.HtmlElement.HandlerT.style.top = "0px";
        oThis.Update_Size();
    };
    this.private_OnDragLeftTopHandler = function()
    {
        var CurTop     = parseInt(oThis.HtmlElement.Control.HtmlElement.style.top);
        var CurHeight  = parseInt(oThis.HtmlElement.Control.HtmlElement.style.height);
        var TopHandler = parseInt(oThis.HtmlElement.HandlerLT.style.top);

        if (CurHeight - TopHandler < 60)
        {
            oThis.HtmlElement.HandlerLT.style.top = "0px";
        }
        else
        {
            oThis.HtmlElement.Control.HtmlElement.style.top = CurTop + TopHandler + "px";
            oThis.HtmlElement.Control.HtmlElement.style.height = CurHeight - TopHandler + "px";
            oThis.HtmlElement.HandlerLT.style.top = "0px";
        }

        var CurLeft     = parseInt(oThis.HtmlElement.Control.HtmlElement.style.left);
        var CurWidth    = parseInt(oThis.HtmlElement.Control.HtmlElement.style.width);
        var LeftHandler = parseInt(oThis.HtmlElement.HandlerLT.style.left);

        if (CurWidth - LeftHandler < 60)
        {
            oThis.HtmlElement.HandlerLT.style.left = "0px";
        }
        else
        {
            oThis.HtmlElement.Control.HtmlElement.style.left = CurLeft + LeftHandler + "px";
            oThis.HtmlElement.Control.HtmlElement.style.width = CurWidth - LeftHandler + "px";
            oThis.HtmlElement.HandlerLT.style.left = "0px";
        }

        oThis.Update_Size();
    };
    this.private_OnDragRightTopHandler  = function()
    {
        var CurTop     = parseInt(oThis.HtmlElement.Control.HtmlElement.style.top);
        var CurHeight  = parseInt(oThis.HtmlElement.Control.HtmlElement.style.height);
        var TopHandler = parseInt(oThis.HtmlElement.HandlerRT.style.top);

        if (CurHeight - TopHandler < 60)
        {
            oThis.HtmlElement.HandlerRT.style.top = "0px";
        }
        else
        {
            oThis.HtmlElement.Control.HtmlElement.style.top = CurTop + TopHandler + "px";
            oThis.HtmlElement.Control.HtmlElement.style.height = CurHeight - TopHandler + "px";
            oThis.HtmlElement.HandlerRT.style.top = "0px";
        }

        var CurWidth    = parseInt(oThis.HtmlElement.Control.HtmlElement.style.width);
        var LeftHandler = parseInt(oThis.HtmlElement.HandlerRT.style.left);

        var Diff = (LeftHandler + 6 - CurWidth);

        if (CurWidth + Diff < 60)
        {
            oThis.HtmlElement.HandlerRT.style.left = CurWidth - 6 + "px";
        }
        else
        {
            oThis.HtmlElement.Control.HtmlElement.style.width = CurWidth + Diff + "px";
            oThis.HtmlElement.HandlerRT.style.left = CurWidth + Diff - 6 + "px";
        }

        oThis.Update_Size();
    };
    this.private_OnDragLeftBottomHandler = function()
    {
        var CurLeft     = parseInt(oThis.HtmlElement.Control.HtmlElement.style.left);
        var CurWidth    = parseInt(oThis.HtmlElement.Control.HtmlElement.style.width);
        var LeftHandler = parseInt(oThis.HtmlElement.HandlerLB.style.left);

        if (CurWidth - LeftHandler < 60)
        {
            oThis.HtmlElement.HandlerLB.style.left = "0px";
        }
        else
        {
            oThis.HtmlElement.Control.HtmlElement.style.left = CurLeft + LeftHandler + "px";
            oThis.HtmlElement.Control.HtmlElement.style.width = CurWidth - LeftHandler + "px";
            oThis.HtmlElement.HandlerLB.style.left = "0px";
        }

        var CurHeight    = parseInt(oThis.HtmlElement.Control.HtmlElement.style.height);
        var TopHandler = parseInt(oThis.HtmlElement.HandlerLB.style.top);

        var Diff = (TopHandler + 6 - CurHeight);

        if (CurHeight + Diff < 60)
        {
            oThis.HtmlElement.HandlerLB.style.top = CurHeight - 6 + "px";
        }
        else
        {
            oThis.HtmlElement.Control.HtmlElement.style.height = CurHeight + Diff + "px";
            oThis.HtmlElement.HandlerLB.style.top = CurHeight + Diff - 6 + "px";
        }

        oThis.Update_Size();
    };
    this.private_OnDragRightBottomHandler = function()
    {
        var CurWidth    = parseInt(oThis.HtmlElement.Control.HtmlElement.style.width);
        var LeftHandler = parseInt(oThis.HtmlElement.HandlerRB.style.left);

        var Diff = (LeftHandler + 6 - CurWidth);

        if (CurWidth + Diff < 60)
        {
            oThis.HtmlElement.HandlerRB.style.left = CurWidth - 6 + "px";
        }
        else
        {
            oThis.HtmlElement.Control.HtmlElement.style.width = CurWidth + Diff + "px";
            oThis.HtmlElement.HandlerRB.style.left = CurWidth + Diff - 6 + "px";
        }

        var CurHeight    = parseInt(oThis.HtmlElement.Control.HtmlElement.style.height);
        var TopHandler = parseInt(oThis.HtmlElement.HandlerRB.style.top);

        var Diff = (TopHandler + 6 - CurHeight);

        if (CurHeight + Diff < 60)
        {
            oThis.HtmlElement.HandlerRB.style.top = CurHeight - 6 + "px";
        }
        else
        {
            oThis.HtmlElement.Control.HtmlElement.style.height = CurHeight + Diff + "px";
            oThis.HtmlElement.HandlerRB.style.top = CurHeight + Diff - 6 + "px";
        }

        oThis.Update_Size();
    };
}

CDrawingWindow.prototype.Init = function(sDivId, bResizable)
{
    var oThis = this;

    this.HtmlElement.Control = CreateControlContainer(sDivId);
    var oMainDiv = this.HtmlElement.Control.HtmlElement;
    var oMainControl = this.HtmlElement.Control;

    oMainDiv.style.border = "1px solid " + this.m_oOuterBorderColor.ToString();
    oMainDiv.style.backgroundColor = this.m_oBackColor.ToString();

    // InnerDiv
    var sInnerDivId   = sDivId  + "_Inner";
    var oInnerElement = this.protected_CreateDivElement(oMainDiv, sInnerDivId);
    var oInnerControl = CreateControlContainer(sInnerDivId);
    oInnerControl.Bounds.SetParams(6, 29, 8, 8, true, true, true, true, -1,-1);
    oInnerControl.Anchor = (g_anchor_top | g_anchor_left | g_anchor_bottom | g_anchor_right);
    oMainControl.AddControl(oInnerControl);
    oInnerElement.style.border = "1px solid " + this.m_oInnerBorderColor.ToString();
    oInnerElement.style.backgroundColor = (new CColor(255,255,255,255)).ToString();
    oInnerElement.style.overflow = "hidden";
    this.HtmlElement.InnerDiv     = oInnerElement;
    this.HtmlElement.InnerControl = oInnerControl;

    // Caption
    var sCaptionId      = sDivId + "_Caption";
    var oCaptionElement = this.protected_CreateDivElement(oMainDiv, sCaptionId);
    var oCaptionControl = CreateControlContainer(sCaptionId);
    oCaptionControl.Bounds.SetParams(0, 0, 1000, 1000, false, false, false, false, -1, 30);
    oCaptionControl.Anchor = (g_anchor_top | g_anchor_left | g_anchor_right);
    oMainControl.AddControl(oCaptionControl);

    // CaptionText
    var sCaptionTextId = sCaptionId + "_Text";
    var oCaptionTextElement = this.protected_CreateDivElement(oMainDiv, sCaptionTextId);
    var oCaptionTextControl = CreateControlContainer(sCaptionTextId);
    oCaptionTextControl.Bounds.SetParams(15, 0, 55, 1000, true, false, true, false, -1, 30);
    oCaptionTextControl.Anchor = (g_anchor_top | g_anchor_left | g_anchor_right | g_anchor_bottom);
    oCaptionControl.AddControl(oCaptionTextControl);
    oCaptionTextElement.style.fontFamily          = "Tahoma, Sans serif";
    oCaptionTextElement.style.fontSize            = "13pt";
    oCaptionTextElement.style.textAlign           = "center";
    oCaptionTextElement.style.height              = "29px";
    oCaptionTextElement.style.lineHeight          = "29px";
    oCaptionTextElement.style.overflow            = "hidden";
    oCaptionTextElement.style.textOverflow        = "ellipsis";
    oCaptionTextElement.style['-o-text-overflow'] = "ellipsis";
    oCaptionTextElement.style.cursor              = "default";
    Common.Set_InnerTextToElement(oCaptionTextElement, "Caption");
    this.HtmlElement.CaptionText = oCaptionTextElement;

    // Caption
    var sCaptionId2      = sDivId + "_Caption2";
    var oCaptionElement2 = this.protected_CreateDivElement(oMainDiv, sCaptionId2);
    var oCaptionControl2 = CreateControlContainer(sCaptionId2);
    oCaptionControl2.Bounds.SetParams(0, 0, 1000, 1000, false, false, false, false, -1, 30);
    oCaptionControl2.Anchor = (g_anchor_top | g_anchor_left | g_anchor_right);
    oMainControl.AddControl(oCaptionControl2);
    this.HtmlElement.Caption = oCaptionElement2;

    Common_DragHandler.Init(oCaptionElement2, null);
    oCaptionElement2.onDrag = function(X, Y)
    {
        var CurLeft     = parseInt(oThis.HtmlElement.Control.HtmlElement.style.left);
        var CurTop      = parseInt(oThis.HtmlElement.Control.HtmlElement.style.top);

        var LeftHandler = parseInt(oThis.HtmlElement.Caption.style.left);
        var TopHandler  = parseInt(oThis.HtmlElement.Caption.style.top);

        oThis.HtmlElement.Control.HtmlElement.style.left = CurLeft + LeftHandler + "px";
        oThis.HtmlElement.Control.HtmlElement.style.top  = CurTop  + TopHandler + "px";

        oThis.HtmlElement.Caption.style.left = "0px";
        oThis.HtmlElement.Caption.style.top  = "0px";
        oThis.Update_Size();
    };

    if (false !== bResizable)
    {
        // Left Handler
        var sLeftHandlerId = sDivId + "_LeftHandler";
        var oLeftHandlerElement = this.protected_CreateDivElement(oMainDiv, sLeftHandlerId);
        var oLeftHandlerControl = CreateControlContainer(sLeftHandlerId);
        oLeftHandlerControl.Bounds.SetParams(0, 6, 1000, 6, false, true, false, true, 6, -1);
        oLeftHandlerControl.Anchor = (g_anchor_top | g_anchor_left | g_anchor_bottom);
        oMainControl.AddControl(oLeftHandlerControl);
        oLeftHandlerElement.style.cursor = "w-resize";
        this.HtmlElement.HandlerL = oLeftHandlerElement;

        // Right Handler
        var sRightHandlerId = sDivId + "_RightHandler";
        var oRightHandlerElement = this.protected_CreateDivElement(oMainDiv, sRightHandlerId);
        var oRightHandlerControl = CreateControlContainer(sRightHandlerId);
        oRightHandlerControl.Bounds.SetParams(0, 6, 0, 6, false, true, true, true, 6, -1);
        oRightHandlerControl.Anchor = (g_anchor_top | g_anchor_right | g_anchor_bottom);
        oMainControl.AddControl(oRightHandlerControl);
        oRightHandlerElement.style.cursor = "w-resize";
        this.HtmlElement.HandlerR = oRightHandlerElement;

        // Bottom Handler
        var sBottomHandlerId = sDivId + "_BottomHandler";
        var oBottomHandlerElement = this.protected_CreateDivElement(oMainDiv, sBottomHandlerId);
        var oBottomHandlerControl = CreateControlContainer(sBottomHandlerId);
        oBottomHandlerControl.Bounds.SetParams(6, 0, 6, 0, true, false, true, true, -1, 6);
        oBottomHandlerControl.Anchor = (g_anchor_bottom | g_anchor_right | g_anchor_left);
        oMainControl.AddControl(oBottomHandlerControl);
        oBottomHandlerElement.style.cursor = "s-resize";
        this.HtmlElement.HandlerB = oBottomHandlerElement;

        // Top Handler
        var sTopHandlerId = sDivId + "_TopHandler";
        var oTopHandlerElement = this.protected_CreateDivElement(oMainDiv, sTopHandlerId);
        var oTopHandlerControl = CreateControlContainer(sTopHandlerId);
        oTopHandlerControl.Bounds.SetParams(6, 0, 6, 1000, true, true, true, false, -1, 6);
        oTopHandlerControl.Anchor = (g_anchor_top | g_anchor_right | g_anchor_left);
        oMainControl.AddControl(oTopHandlerControl);
        oTopHandlerElement.style.cursor = "s-resize";
        this.HtmlElement.HandlerT = oTopHandlerElement;

        // Left-Top Handler
        var sLeftTopHandlerId = sDivId + "_LeftTopHandler";
        var oLeftTopHandlerElement = this.protected_CreateDivElement(oMainDiv, sLeftTopHandlerId);
        var oLeftTopHandlerControl = CreateControlContainer(sLeftTopHandlerId);
        oLeftTopHandlerControl.Bounds.SetParams(0, 0, 1000, 1000, false, false, false, false, 6, 6);
        oLeftTopHandlerControl.Anchor = (g_anchor_top | g_anchor_left);
        oMainControl.AddControl(oLeftTopHandlerControl);
        oLeftTopHandlerElement.style.cursor = "se-resize";
        this.HtmlElement.HandlerLT = oLeftTopHandlerElement;

        // Right-Top Handler
        var sRightTopHandlerId = sDivId + "_RightTopHandler";
        var oRightTopHandlerElement = this.protected_CreateDivElement(oMainDiv, sRightTopHandlerId);
        var oRightTopHandlerControl = CreateControlContainer(sRightTopHandlerId);
        oRightTopHandlerControl.Bounds.SetParams(0, 0, 0, 1000, false, false, true, false, 6, 6);
        oRightTopHandlerControl.Anchor = (g_anchor_top | g_anchor_right);
        oMainControl.AddControl(oRightTopHandlerControl);
        oRightTopHandlerElement.style.cursor = "ne-resize";
        this.HtmlElement.HandlerRT = oRightTopHandlerElement;

        // Left-Bottom Handler
        var sLeftBottomHandlerId = sDivId + "_LeftBottomHandler";
        var oLeftBottomHandlerElement = this.protected_CreateDivElement(oMainDiv, sLeftBottomHandlerId);
        var oLeftBottomHandlerControl = CreateControlContainer(sLeftBottomHandlerId);
        oLeftBottomHandlerControl.Bounds.SetParams(0, 0, 0, 1000, false, false, false, false, 6, 6);
        oLeftBottomHandlerControl.Anchor = (g_anchor_bottom | g_anchor_left);
        oMainControl.AddControl(oLeftBottomHandlerControl);
        oLeftBottomHandlerElement.style.cursor = "ne-resize";
        this.HtmlElement.HandlerLB = oLeftBottomHandlerElement;

        // Right-Bottom Handler
        var sRightBottomHandlerId = sDivId + "_RightBottomHandler";
        var oRightBottomHandlerElement = this.protected_CreateDivElement(oMainDiv, sRightBottomHandlerId);
        var oRightBottomHandlerControl = CreateControlContainer(sRightBottomHandlerId);
        oRightBottomHandlerControl.Bounds.SetParams(0, 0, 0, 1000, false, false, true, false, 6, 6);
        oRightBottomHandlerControl.Anchor = (g_anchor_bottom | g_anchor_right);
        oMainControl.AddControl(oRightBottomHandlerControl);
        oRightBottomHandlerElement.style.cursor = "se-resize";
        this.HtmlElement.HandlerRB = oRightBottomHandlerElement;

        Common_DragHandler.Init(this.HtmlElement.HandlerL, null, null, null, null, null);
        this.HtmlElement.HandlerL.onDrag = this.private_OnDragLeftHandler;

        Common_DragHandler.Init(this.HtmlElement.HandlerR, null, null, null, null, null);
        this.HtmlElement.HandlerR.onDrag = this.private_OnDragRightHandler;

        Common_DragHandler.Init(this.HtmlElement.HandlerT, null, null, null, null, null);
        this.HtmlElement.HandlerT.onDrag = this.private_OnDragTopHandler;

        Common_DragHandler.Init(this.HtmlElement.HandlerB, null, null, null, null, null);
        this.HtmlElement.HandlerB.onDrag = this.private_OnDragBottomHandler;

        Common_DragHandler.Init(this.HtmlElement.HandlerLT, null, null, null, null, null);
        this.HtmlElement.HandlerLT.onDrag = this.private_OnDragLeftTopHandler;

        Common_DragHandler.Init(this.HtmlElement.HandlerRT, null, null, null, null, null);
        this.HtmlElement.HandlerRT.onDrag = this.private_OnDragRightTopHandler;

        Common_DragHandler.Init(this.HtmlElement.HandlerLB, null, null, null, null, null);
        this.HtmlElement.HandlerLB.onDrag = this.private_OnDragLeftBottomHandler;

        Common_DragHandler.Init(this.HtmlElement.HandlerRB, null, null, null, null, null);
        this.HtmlElement.HandlerRB.onDrag = this.private_OnDragRightBottomHandler;
    }

    // CloseButton
    var sCloseButtonId = sDivId + "_Close";
    var oCloseButtonElement = this.protected_CreateDivElement(oMainDiv, sCloseButtonId);
    var oCloseButtonControl = CreateControlContainer(sCloseButtonId);
    oCloseButtonControl.Bounds.SetParams(0, 0, 6, 1000, false, true, true, false, 45, 20);
    oCloseButtonControl.Anchor = (g_anchor_top | g_anchor_right);
    oMainControl.AddControl(oCloseButtonControl);
    oCloseButtonElement.style.backgroundColor = (new CColor(255, 0, 0, 255)).ToString();

    var oCloseButton = new CDrawingButton(this.m_oDrawing);
    oCloseButton.Init(sCloseButtonId, this, EDrawingButtonType.WindowClose);
    oCloseButton.m_oNormaFColor = new CColor(199, 80, 80, 255);
    oCloseButton.m_oHoverFColor = new CColor(224, 67, 67, 255);
    oCloseButton.m_oActiveFColor = new CColor(153, 61, 61, 255);

    this.HtmlElement.CloseButton = oCloseButton;
};
CDrawingWindow.prototype.Update_Size = function(bForce)
{
    var W = this.HtmlElement.Control.HtmlElement.clientWidth;
    var H = this.HtmlElement.Control.HtmlElement.clientHeight;

    if (W !== this.m_nW || H !== this.m_nH || true === bForce)
    {
        this.m_nW = W;
        this.m_nH = H;

        this.HtmlElement.Control.Resize(W, H);
        this.HtmlElement.CloseButton.Update_Size();
    }
};
CDrawingWindow.prototype.Close = function()
{
    var oMainDiv = this.HtmlElement.Control.HtmlElement;
    oMainDiv.parentNode.removeChild(oMainDiv);

    if (this.m_oGameTree)
        this.m_oGameTree.Focus();
};
CDrawingWindow.prototype.Focus = function()
{

};
CDrawingWindow.prototype.Set_Caption = function(sCaption)
{
    Common.Set_InnerTextToElement(this.HtmlElement.CaptionText, sCaption);
};
CDrawingWindow.prototype.protected_CreateDivElement = function(oParentElement, sName)
{
    var oElement = document.createElement("div");
    oElement.setAttribute("id", sName);
    oElement.setAttribute("style", "position:absolute;padding:0;margin:0;");
    oElement.setAttribute("oncontextmenu", "return false;");
    oParentElement.appendChild(oElement);
    return oElement;
};

function CDrawingConfirmWindow()
{
    CDrawingConfirmWindow.superclass.constructor.call(this);

    this.HtmlElement.OKButton     = null;
    this.HtmlElement.CancelButton = null;

    this.HtmlElement.ConfirmInnerDiv     = null;
    this.HtmlElement.ConfirmInnerControl = null;
}

CommonExtend(CDrawingConfirmWindow, CDrawingWindow);

CDrawingConfirmWindow.prototype.Init = function(_sDivId, bResizable)
{
    CDrawingConfirmWindow.superclass.Init.call(this, _sDivId, bResizable);

    var oMainDiv     = this.HtmlElement.InnerDiv;
    var oMainControl = this.HtmlElement.InnerControl;
    var sDivId = oMainDiv.id;

    var sContentDiv = sDivId + "Content";
    var sButtonsDiv = sDivId + "Buttons";

    var oContentDiv = this.protected_CreateDivElement(oMainDiv, sContentDiv);
    var oButtonsDiv = this.protected_CreateDivElement(oMainDiv, sButtonsDiv);

    var oContentControl = CreateControlContainer(sContentDiv);
    oContentControl.Bounds.SetParams(0, 0, 0, 40, true, true, true, true, -1, -1);
    oContentControl.Anchor = (g_anchor_left | g_anchor_top | g_anchor_bottom | g_anchor_right);
    oMainControl.AddControl(oContentControl);

    var oButtonsControl = CreateControlContainer(sButtonsDiv);
    oButtonsControl.Bounds.SetParams(0, 0, 0, 0, true, false, true, true, -1, 40);
    oButtonsControl.Anchor = (g_anchor_left |g_anchor_bottom | g_anchor_right);
    oMainControl.AddControl(oButtonsControl);

    this.HtmlElement.ConfirmInnerControl = oContentControl;
    this.HtmlElement.ConfirmInnerDiv     = oContentDiv;

    // TODO: Цвета должны быть из темы
    oButtonsDiv.style.borderTop = "1px solid rgb(172,172,172)";
    oButtonsDiv.style.backgroundColor = "rgb(240,240,240)";

    // Butttons OK Cancel

    var sButtonOk        = sButtonsDiv + "OK";
    var oButtonOkElement = this.protected_CreateDivElement(oButtonsDiv, sButtonOk);
    var oButtonOkControl = CreateControlContainer(sButtonOk);
    oButtonOkControl.Bounds.SetParams(0, 9, 85, 1000, false, true, true, false, 66, 21);
    oButtonOkControl.Anchor = (g_anchor_top | g_anchor_right);
    oMainControl.AddControl(oButtonOkControl);
    var oDrawingButttonOK = new CDrawingButton(this.m_oDrawing);
    oDrawingButttonOK.Init(sButtonOk, this, EDrawingButtonType.WindowOK);
    this.HtmlElement.OKButton = oDrawingButttonOK;

    oDrawingButttonOK.m_oNormaBColor    = new CColor(234, 234, 234, 255); // 229,229,229 -> 240,240,240
    oDrawingButttonOK.m_oNormaFColor    = new CColor(172, 172, 172, 255);
    oDrawingButttonOK.m_oHoverBColor    = new CColor(227, 240, 252, 255); // 220,236,252 -> 236,244,252
    oDrawingButttonOK.m_oHoverFColor    = new CColor(126, 180, 234, 255);
    oDrawingButttonOK.m_oActiveBColor   = new CColor(207, 230, 252, 255); // 196,224,252 -> 218,235,252
    oDrawingButttonOK.m_oActiveFColor   = new CColor( 86, 157, 229, 255);
    oDrawingButttonOK.m_oDisabledBColor = new CColor(239, 239, 239, 255);
    oDrawingButttonOK.m_oDisabledFColor = new CColor(217, 217, 217, 255);

    var sButtonCancel        = sButtonsDiv + "Cancel";
    var oButtonCancelElement = this.protected_CreateDivElement(oButtonsDiv, sButtonCancel);
    var oButtonCancelControl = CreateControlContainer(sButtonCancel);
    oButtonCancelControl.Bounds.SetParams(0, 9, 11, 1000, false, true, true, false, 66, 21);
    oButtonCancelControl.Anchor = (g_anchor_top | g_anchor_right);
    oMainControl.AddControl(oButtonCancelControl);
    var oDrawingButttonCancel = new CDrawingButton(this.m_oDrawing);
    oDrawingButttonCancel.Init(sButtonCancel, this, EDrawingButtonType.WindowCancel);
    this.HtmlElement.CancelButton = oDrawingButttonCancel;

    oDrawingButttonCancel.m_oNormaBColor    = new CColor(234, 234, 234, 255); // 229,229,229 -> 240,240,240
    oDrawingButttonCancel.m_oNormaFColor    = new CColor(172, 172, 172, 255);
    oDrawingButttonCancel.m_oHoverBColor    = new CColor(227, 240, 252, 255); // 220,236,252 -> 236,244,252
    oDrawingButttonCancel.m_oHoverFColor    = new CColor(126, 180, 234, 255);
    oDrawingButttonCancel.m_oActiveBColor   = new CColor(207, 230, 252, 255); // 196,224,252 -> 218,235,252
    oDrawingButttonCancel.m_oActiveFColor   = new CColor( 86, 157, 229, 255);
    oDrawingButttonCancel.m_oDisabledBColor = new CColor(239, 239, 239, 255);
    oDrawingButttonCancel.m_oDisabledFColor = new CColor(217, 217, 217, 255);
};
CDrawingConfirmWindow.prototype.Update_Size = function(bForce)
{
    CDrawingConfirmWindow.superclass.Update_Size.call(this, bForce);

    if (this.HtmlElement.OKButton)
        this.HtmlElement.OKButton.Update_Size();

    if (this.HtmlElement.CancelButton)
        this.HtmlElement.CancelButton.Update_Size();
};
CDrawingConfirmWindow.prototype.Handle_Cancel = function()
{
    this.Close();
};
CDrawingConfirmWindow.prototype.Handle_OK = function()
{
    this.Close();
};

function CDrawingInfoWindow()
{
    CDrawingInfoWindow.superclass.constructor.call(this);

    this.HtmlElement2 = {};
    this.m_oGameTree = null;
}

CommonExtend(CDrawingInfoWindow, CDrawingConfirmWindow);

CDrawingInfoWindow.prototype.Init = function(_sDivId, oPr)
{
    CDrawingInfoWindow.superclass.Init.call(this, _sDivId);

    var oGameTree = oPr.GameTree;
    this.m_oGameTree = oGameTree;

    if (true !== oGameTree.Can_EditGameInfo())
        this.HtmlElement.OKButton.Set_Enabled(false);


    this.Set_Caption("Game info");

    var oMainControl = this.HtmlElement.ConfirmInnerControl;
    var oMainDiv     = this.HtmlElement.ConfirmInnerDiv;
    var sDivId       = this.HtmlElement.ConfirmInnerDiv.id;

    oMainDiv.style.overflowX = "hidden";
    oMainDiv.style.overflowY = "scroll";

    var RowHeight   = 20;
    var TopOffset   = 10;
    var LineSpacing = 5;
    var BottomOffset = 10;

    var bCanEdit = oGameTree.Can_EditGameInfo();
    this.HtmlElement2.GameName = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Game name", oGameTree.Get_GameName(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.Result = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Result", oGameTree.Get_Result(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.Rules = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Rules", oGameTree.Get_Rules(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.Komi = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Komi", oGameTree.Get_Komi(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.Handicap = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Handicap", oGameTree.Get_Handicap(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.TimeSettings = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Time settings", oGameTree.Get_TimeLimit() + (oGameTree.Get_OverTime() === "" ? "" : " + " + oGameTree.Get_OverTime()), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;

    this.HtmlElement2.BlackName = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Black", oGameTree.Get_BlackName(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.BlackRank = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Black rank", oGameTree.Get_BlackRating(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.WhiteName = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "White", oGameTree.Get_WhiteName(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.WhiteRank = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "White rank", oGameTree.Get_WhiteRating(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;

    this.HtmlElement2.Copyright = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Copyright", oGameTree.Get_Copyright(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.GameInfo = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Game info", oGameTree.Get_GameInfo(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.Date = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Date", oGameTree.Get_DateTime(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.Event = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Event", oGameTree.Get_GameEvent(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.Round = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Round", oGameTree.Get_GameRound(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.Place = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Place", oGameTree.Get_GamePlace(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;

    this.HtmlElement2.Annotator = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Annotator", oGameTree.Get_GameAnnotator(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.Fuseki = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Fuseki", oGameTree.Get_GameFuseki(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.Source = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Source", oGameTree.Get_GameSource(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.HtmlElement2.Transcriber = this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Transcriber", oGameTree.Get_GameTranscriber(), TopOffset, RowHeight, bCanEdit);
    TopOffset += RowHeight + LineSpacing;
    this.protected_CreateDivElement(oMainDiv, sDivId + "Bottom");
    var BottomControl = CreateControlContainer(sDivId + "Bottom");
    BottomControl.Bounds.SetParams(0, TopOffset, 1000, 1000, true, true, false, false, 0, BottomOffset);
    BottomControl.Anchor = (g_anchor_left | g_anchor_top | g_anchor_right);
    oMainControl.AddControl(BottomControl);
};
CDrawingInfoWindow.prototype.Update_Size = function(bForce)
{
    CDrawingInfoWindow.superclass.Update_Size.call(this, bForce);

    if (this.HtmlElement.OKButton)
        this.HtmlElement.OKButton.Update_Size();

    if (this.HtmlElement.CancelButton)
        this.HtmlElement.CancelButton.Update_Size();
};
CDrawingInfoWindow.prototype.Handle_Cancel = function()
{
    this.Close();
};
CDrawingInfoWindow.prototype.Handle_OK = function()
{
    if (this.m_oGameTree)
    {
        this.m_oGameTree.Set_GameName(this.HtmlElement2.GameName.value);
        this.m_oGameTree.Set_Result(this.HtmlElement2.Result.value);
        this.m_oGameTree.Set_Rules(this.HtmlElement2.Rules.value);
        this.m_oGameTree.Set_Komi(parseFloat(this.HtmlElement2.Komi.value));
        this.m_oGameTree.Set_Handicap(this.HtmlElement2.Handicap.value);

        // TODO: разбить на TimeLimit и Overtime
        this.m_oGameTree.Set_TimeLimit(this.HtmlElement2.TimeSettings.value);

        this.m_oGameTree.Set_Black(this.HtmlElement2.BlackName.value);
        this.m_oGameTree.Set_BlackRating(this.HtmlElement2.BlackRank.value);
        this.m_oGameTree.Set_White(this.HtmlElement2.WhiteName.value);
        this.m_oGameTree.Set_WhiteRating(this.HtmlElement2.WhiteRank.value);
        this.m_oGameTree.Set_Copyright(this.HtmlElement2.Copyright.value);
        this.m_oGameTree.Set_GameInfo(this.HtmlElement2.GameInfo.value);
        this.m_oGameTree.Set_DateTime(this.HtmlElement2.Date.value);
        this.m_oGameTree.Set_GameEvent(this.HtmlElement2.Event.value);
        this.m_oGameTree.Set_GameRound(this.HtmlElement2.Round.value);
        this.m_oGameTree.Set_GamePlace(this.HtmlElement2.Place.value);
        this.m_oGameTree.Set_GameAnnotator(this.HtmlElement2.Annotator.value);
        this.m_oGameTree.Set_GameFuseki(this.HtmlElement2.Fuseki.value);
        this.m_oGameTree.Set_GameSource(this.HtmlElement2.Source.value);
        this.m_oGameTree.Set_GameTranscriber(this.HtmlElement2.Transcriber.value);
    }

    this.Close();
};
CDrawingInfoWindow.prototype.private_CreateDivElement = function(oParentElement, sName, Height)
{
    var oElement = document.createElement("div");
    oElement.setAttribute("id", sName);
    oElement.setAttribute("style", "position:absolute;padding:0;margin:0;");
    oElement.setAttribute("oncontextmenu", "return false;");
    oElement.style.fontFamily  = "Tahoma, Sans serif";
    oElement.style.fontSize    = Height * 15 / 20 + "px";
    oElement.style.lineHeight  = Height + "px";
    oElement.style.height      = Height + "px";

    oParentElement.appendChild(oElement);
    return oElement;
};
CDrawingInfoWindow.prototype.private_CreateInputElement = function(oParentElement, sName, bCanEdit)
{
    var oElement = document.createElement("input");
    oElement.setAttribute("id", sName);
    oElement.setAttribute("style", "position:absolute;padding:0;margin:0;");
    oElement.setAttribute("oncontextmenu", "return false;");
    oElement.setAttribute("type", "text");
    oElement.style.fontFamily  = "Tahoma, Sans serif";
    oElement.style.fontSize    = "10pt";
    oElement.style.outline     = "none";

    if (false === bCanEdit)
        oElement.disabled = "disabled";

    oParentElement.appendChild(oElement);
    return oElement;
};
CDrawingInfoWindow.prototype.private_CreateInfoElement = function(oMainDiv, oMainControl, sDivId, sName, sValue, TopOffset, RowHeight, bCanEdit)
{
    var LeftWidth  = 100;
    var LeftOffset = 10;
    var RightOffset = 10;

    RightOffset += 20; // Scroll

    var sNameId      = sDivId + sName;
    var oNameElement = this.private_CreateDivElement(oMainDiv, sNameId, RowHeight);
    var oNameControl = CreateControlContainer(sNameId);
    oNameControl.Bounds.SetParams(LeftOffset, TopOffset, 1000, 1000, true, true, false, false, LeftWidth, RowHeight);
    oNameControl.Anchor = (g_anchor_left | g_anchor_top);
    oMainControl.AddControl(oNameControl);
    Common.Set_InnerTextToElement(oNameElement, sName);

    var sValueId      = sNameId + "Value";
    var oValueElement = this.private_CreateInputElement(oMainDiv, sValueId, bCanEdit);
    var oValueControl = CreateControlContainer(sValueId);
    oValueControl.Bounds.SetParams(LeftOffset + LeftWidth, TopOffset + 1, RightOffset, 1000, true, true, true, false, -1, RowHeight - 2);
    oValueControl.Anchor = (g_anchor_left | g_anchor_top | g_anchor_right);
    oMainControl.AddControl(oValueControl);
    oValueElement.value = sValue;

    return oValueElement;
};

function CDrawingErrorWindow()
{
    CDrawingErrorWindow.superclass.constructor.call(this);
}

CommonExtend(CDrawingErrorWindow, CDrawingWindow);

CDrawingErrorWindow.prototype.Init = function(_sDivId, oPr)
{
    CDrawingInfoWindow.superclass.Init.call(this, _sDivId, false);

    var sText = oPr.ErrorText;

    var oMainDiv     = this.HtmlElement.InnerDiv;
    var oMainControl = this.HtmlElement.InnerControl;

    oMainDiv.style.fontFamily = "Tahoma, Sans serif";
    oMainDiv.style.fontSize   = 16 + "px";

    Common.Set_InnerTextToElement(oMainDiv, sText);
};

function CDrawingSettingsWindow()
{
    CDrawingSettingsWindow.superclass.constructor.call(this);

    this.m_oGameTree = null;

    this.HtmlElement2 =
    {
        Theme :
        {
            TrueColor   : null,
            SimpleColor : null,
            BookStyle   : null,
            Dark        : null
        },

        Sound : null
    };
}

CommonExtend(CDrawingSettingsWindow, CDrawingConfirmWindow);

CDrawingSettingsWindow.prototype.Init = function(_sDivId, oPr)
{
    CDrawingSettingsWindow.superclass.Init.call(this, _sDivId, false);
    var oWindowDiv = document.getElementById(_sDivId);
    oWindowDiv.style.width  = "170px";
    oWindowDiv.style.height = "230px";

    this.m_oGameTree = oPr.GameTree;

    var oMainDiv     = this.HtmlElement.ConfirmInnerDiv;
    var oMainControl = this.HtmlElement.ConfirmInnerControl;
    var sDivId       = this.HtmlElement.ConfirmInnerDiv.id;

    this.Set_Caption("Settings");

    var sThemeId = "ThemeId";

    var nTop = 17;
    var nGBT = 110;

    var sThemeGroupBox = sDivId + "TGB";
    var oGroupBoxElement = this.protected_CreateDivElement(oMainDiv, sThemeGroupBox);
    var oGroupBoxControl = CreateControlContainer(sThemeGroupBox);
    oGroupBoxControl.Bounds.SetParams(6, nTop, 8, 1000, true, true, true, false, -1, nGBT);
    oGroupBoxControl.Anchor = (g_anchor_top | g_anchor_left | g_anchor_right);
    oMainControl.AddControl(oGroupBoxControl);
    oGroupBoxElement.style.border = "1px solid rgb(221,221,221)";

    nTop += nGBT;

    var sThemeGroupBoxName = sThemeGroupBox + "N";
    var oGroupBoxNameElement = this.protected_CreateDivElement(oMainDiv, sThemeGroupBoxName);
    var oGroupBoxNameControl = CreateControlContainer(sThemeGroupBoxName);
    oGroupBoxNameControl.Bounds.SetParams(20, 10, 1000, 1000, true, true, false, false, 100, 15);
    oGroupBoxNameControl.Anchor = (g_anchor_top | g_anchor_left);
    oMainControl.AddControl(oGroupBoxNameControl);
    oGroupBoxNameElement.style.backgroundColor = "rgb(255,255,255)";
    oGroupBoxNameElement.style.fontFamily          = "Tahoma, Sans serif";
    oGroupBoxNameElement.style.fontSize            = "10pt";
    oGroupBoxNameElement.style.textAlign           = "center";
    oGroupBoxNameElement.style.height              = "15px";
    oGroupBoxNameElement.style.lineHeight          = "15px";
    oGroupBoxNameElement.style.overflow            = "hidden";
    oGroupBoxNameElement.style.textOverflow        = "ellipsis";
    oGroupBoxNameElement.style['-o-text-overflow'] = "ellipsis";
    oGroupBoxNameElement.style.cursor              = "default";
    Common.Set_InnerTextToElement(oGroupBoxNameElement, "Color scheme");

    var oTopPaddingElement = document.createElement("div");
    oTopPaddingElement.style.width  = "100%";
    oTopPaddingElement.style.height = "10px";
    oGroupBoxElement.appendChild(oTopPaddingElement)

    this.HtmlElement2.Theme.TrueColor   = this.private_CreateRadioButton(oGroupBoxElement, sThemeGroupBox + "TC", sThemeId, "TrueColor");
    this.HtmlElement2.Theme.SimpleColor = this.private_CreateRadioButton(oGroupBoxElement, sThemeGroupBox + "SC", sThemeId, "SimpleColor");
    this.HtmlElement2.Theme.BookStyle   = this.private_CreateRadioButton(oGroupBoxElement, sThemeGroupBox + "BS", sThemeId, "BookStyle");
    this.HtmlElement2.Theme.Dark        = this.private_CreateRadioButton(oGroupBoxElement, sThemeGroupBox + "D",  sThemeId, "Dark");

    nTop += 5; // отступ

    var nGBS = 15;
    var sGroupBoxSound = sDivId + "S";
    var oGroupBoxSoundElement = this.protected_CreateDivElement(oMainDiv, sGroupBoxSound);
    var oGroupBoxSoundControl = CreateControlContainer(sGroupBoxSound);
    oGroupBoxSoundControl.Bounds.SetParams(6, nTop, 8, 8, true, true, true, false, -1, 15);
    oGroupBoxSoundControl.Anchor = (g_anchor_top | g_anchor_left | g_anchor_right);
    oMainControl.AddControl(oGroupBoxSoundControl);
    this.HtmlElement2.Sound = this.private_CreateCheckBox(oGroupBoxSoundElement, sGroupBoxSound + "S", this.m_oGameTree.Is_SoundOn(), "Sound");

    nTop += nGBS;

    this.private_CheckColorTheme();
};
CDrawingSettingsWindow.prototype.Handle_OK = function()
{
    var eColorScheme = EColorScheme.TrueColor;
    if (this.HtmlElement2.Theme.SimpleColor.checked)
        eColorScheme = EColorScheme.SimpleColor;
    else if (this.HtmlElement2.Theme.BookStyle.checked)
        eColorScheme = EColorScheme.BookStyle;
    else if (this.HtmlElement2.Theme.Dark.checked)
        eColorScheme = EColorScheme.Dark;
    else // TrueColor
        eColorScheme = EColorScheme.TrueColor;

    var oSchemeChange = g_oGlobalSettings.Set_ColorScheme(eColorScheme);

    if (this.HtmlElement2.Sound.checked)
        this.m_oGameTree.TurnOn_Sound();
    else
        this.m_oGameTree.TurnOff_Sound();

    var oBoard     = this.m_oGameTree.Get_DrawingBoard();
    var oNavigator = this.m_oGameTree.Get_DrawingNavigator();

    if (oBoard && true === oSchemeChange.Board)
        oBoard.Update_Size(true);

    if (oNavigator && true === oSchemeChange.Navigator)
        oNavigator.Update_All();

    this.Close();
};
CDrawingSettingsWindow.prototype.private_CreateRadioButton = function(oParentElement, sName, sRadioIs, sRadioValue)
{
    var oMainElement = document.createElement("div");
    oMainElement.style.paddingLeft   = "10px";
    oMainElement.style.paddingBottom = "5px";
    oParentElement.appendChild(oMainElement);

    var oElement = document.createElement("input");
    oElement.type  = "radio";
    oElement.name  = sRadioIs;
    oElement.value = sRadioValue;
    oElement.setAttribute("id", sName);

    oMainElement.appendChild(oElement);

    var oSpan = document.createElement("span");
    oSpan.setAttribute("oncontextmenu", "return false;");
    oSpan.style.fontFamily  = "Tahoma, Sans serif";
    Common.Set_InnerTextToElement(oSpan, sRadioValue);
    oSpan.style.fontFamily          = "Tahoma, Sans serif";
    oSpan.style.fontSize            = "13pt";
    oSpan.style.height              = "15px";
    oSpan.style.lineHeight          = "15px";
    oSpan.style.cursor = "default";



    oMainElement.appendChild(oSpan);

    oSpan.addEventListener("click", function()
    {
        oElement.checked = true;
    }, false);

    return oElement;
};
CDrawingSettingsWindow.prototype.private_CreateCheckBox = function(oParentElement, sName, bChecked, sCheckboxName)
{
    var oMainElement = document.createElement("div");
    oMainElement.style.paddingLeft   = "10px";
    oMainElement.style.paddingBottom = "5px";
    oParentElement.appendChild(oMainElement);

    var oElement = document.createElement("input");
    oElement.type    = "checkbox";
    oElement.checked = bChecked;
    oElement.setAttribute("id", sName);

    oMainElement.appendChild(oElement);

    var oSpan = document.createElement("span");
    oSpan.setAttribute("oncontextmenu", "return false;");
    oSpan.style.fontFamily  = "Tahoma, Sans serif";
    Common.Set_InnerTextToElement(oSpan, sCheckboxName);
    oSpan.style.fontFamily          = "Tahoma, Sans serif";
    oSpan.style.fontSize            = "13pt";
    oSpan.style.height              = "15px";
    oSpan.style.lineHeight          = "15px";
    oSpan.style.cursor = "default";

    oMainElement.appendChild(oSpan);

    oSpan.addEventListener("click", function()
    {
        oElement.checked = !oElement.checked;
    }, false);

    return oElement;
};
CDrawingSettingsWindow.prototype.private_CheckColorTheme = function()
{
    var oBoardColorR = g_oGlobalSettings.m_oBoardPr.oBoardColor.r;

    if (231 === oBoardColorR)
    {
        // Simple or TrueColor
        if (g_oGlobalSettings.m_oBoardPr.bTrueColorBoard)
            this.HtmlElement2.Theme.TrueColor.checked = true;
        else
            this.HtmlElement2.Theme.SimpleColor.checked = true;
    }
    else if (255 === oBoardColorR)
    {
        this.HtmlElement2.Theme.BookStyle.checked = true;
    }
    else if (30 === oBoardColorR)
    {
        this.HtmlElement2.Theme.Dark.checked = true;
    }
    else
    {
        this.HtmlElement2.Theme.TrueColor.checked = true;
    }
};

function CDrawingScoreEstimateWindow()
{
    CDrawingScoreEstimateWindow.superclass.constructor.call(this);

    this.m_oDrawingBoard = null;
}

CommonExtend(CDrawingScoreEstimateWindow, CDrawingWindow);

CDrawingScoreEstimateWindow.prototype.Init = function(_sDivId, oPr)
{
    CDrawingScoreEstimateWindow.superclass.Init.call(this, _sDivId, true);

    this.m_oGameTree = oPr.GameTree;

    this.Set_Caption("Score estimate");

    var oMainDiv     = this.HtmlElement.InnerDiv;
    var oMainControl = this.HtmlElement.InnerControl;
    var sMainId      = this.HtmlElement.InnerDiv.id;

    oMainDiv.style.background = "url(\'" + g_sBackground + "\')";
    oMainControl.Set_Type(2);

    var sBoard = sMainId + "B";
    var oBoardElement = this.protected_CreateDivElement(oMainDiv, sBoard);
    var oBoardControl = CreateControlContainer(sBoard);
    oBoardControl.Bounds.SetParams(0, 0, 1000, 1000, true, true, false, false, -1, -1);
    oBoardControl.Anchor = (g_anchor_top | g_anchor_left | g_anchor_bottom | g_anchor_right);
    oMainControl.AddControl(oBoardControl);

    var oDrawingBoard = new CDrawingBoard();
    oDrawingBoard.Init(sBoard, this.m_oGameTree.Copy_ForScoreEstimate());
    oDrawingBoard.Set_EstimateMode(this);

    this.m_oDrawingBoard = oDrawingBoard;
};
CDrawingScoreEstimateWindow.prototype.Update_Size = function(bForce)
{
    CDrawingScoreEstimateWindow.superclass.Update_Size.call(this, bForce);

    if (this.m_oDrawingBoard)
        this.m_oDrawingBoard.Update_Size(bForce);
};
CDrawingScoreEstimateWindow.prototype.On_EstimateEnd = function(BlackReal, WhiteReal, BlackPotential, WhitePotential)
{
    var sCaption = "B " + BlackReal + "(" + BlackPotential + ") W " + WhiteReal + "(" + WhitePotential + ")";
    this.Set_Caption(sCaption);
};

function CDrawingCountColorsWindow()
{
    CDrawingCountColorsWindow.superclass.constructor.call(this);
}

CommonExtend(CDrawingCountColorsWindow, CDrawingWindow);

CDrawingCountColorsWindow.prototype.Init = function(_sDivId, oPr)
{
    CDrawingCountColorsWindow.superclass.Init.call(this, _sDivId, true);

    this.Set_Caption("Colors counter");

    var oMainDiv     = this.HtmlElement.InnerDiv;
    var oMainControl = this.HtmlElement.InnerControl;
    var sDivId       = this.HtmlElement.InnerDiv.id;

    oMainDiv.style.overflowX = "hidden";
    oMainDiv.style.overflowY = "scroll";

    var RowHeight   = 20;
    var TopOffset   = 10;
    var LineSpacing = 5;
    var BottomOffset = 10;

    var oColorsMap = oPr.DrawingBoard.m_oColorMarks;

    var Red = [0, 0, 0, 0], Green = [0, 0, 0, 0], Blue = [0, 0, 0, 0], Gray = [0, 0, 0, 0];
    var bRed = false, bGreen = false, bBlue = false, bGray = false;

    for (var oPos in oColorsMap)
    {
        var oColor = oColorsMap[oPos];
        var nNum = -1;

        if (0 !== oColor.r && 0 !== oColor.g && 0 !== oColor.b)
        {
            bGray = true;
            nNum = 3;
        }
        else if (0 !== oColor.r)
        {
            bRed = true;
            nNum = 0;
        }
        else if (0 !== oColor.g)
        {
            bGreen = true;
            nNum = 1;
        }
        else if (0 !== oColor.b)
        {
            bBlue = true;
            nNum = 2;
        }

        var Index = 0;
        if (oColor.a <= 50)
            Index = 0;
        else if (oColor.a <= 100)
            Index = 1;
        else if (oColor.a <= 150)
            Index = 2;
        else
            Index = 3;

        switch (nNum)
        {
            case 0: Red[Index]++; break;
            case 1: Green[Index]++; break;
            case 2: Blue[Index]++; break;
            case 3: Gray[Index]++; break;
        }
    }

    if (bRed)
    {
        this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Red", "4 x " + Red[3] + "+ 3 x " + Red[2] + " + 2 x " + Red[1] + " + 1 x " + Red[0] + " =" + (4 * Red[3] + 3 * Red[2] + 2 * Red[1] + Red[0]), TopOffset, RowHeight);
        TopOffset += RowHeight + LineSpacing;
    }

    if (bGreen)
    {
        this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Green", "4 x " + Green[3] + "+ 3 x " + Green[2] + " + 2 x " + Green[1] + " + 1 x " + Green[0] + " =" + (4 * Green[3] + 3 * Green[2] + 2 * Green[1] + Green[0]), TopOffset, RowHeight);
        TopOffset += RowHeight + LineSpacing;
    }

    if (bBlue)
    {
        this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Blue", "4 x " + Blue[3] + "+ 3 x " + Blue[2] + " + 2 x " + Blue[1] + " + 1 x " + Blue[0] + " =" + (4 * Blue[3] + 3 * Blue[2] + 2 * Blue[1] + Blue[0]), TopOffset, RowHeight);
        TopOffset += RowHeight + LineSpacing;
    }

    if (bGray)
    {
        this.private_CreateInfoElement(oMainDiv, oMainControl, sDivId, "Gray", "4 x " + Gray[3] + "+ 3 x " + Gray[2] + " + 2 x " + Gray[1] + " + 1 x " + Gray[0] + " =" + (4 * Gray[3] + 3 * Gray[2] + 2 * Gray[1] + Gray[0]), TopOffset, RowHeight);
        TopOffset += RowHeight + LineSpacing;
    }

    this.protected_CreateDivElement(oMainDiv, sDivId + "Bottom");
    var BottomControl = CreateControlContainer(sDivId + "Bottom");
    BottomControl.Bounds.SetParams(0, TopOffset, 1000, 1000, true, true, false, false, 0, BottomOffset);
    BottomControl.Anchor = (g_anchor_left | g_anchor_top | g_anchor_right);
    oMainControl.AddControl(BottomControl);
};
CDrawingCountColorsWindow.prototype.private_CreateDivElement = function(oParentElement, sName, Height)
{
    var oElement = document.createElement("div");
    oElement.setAttribute("id", sName);
    oElement.setAttribute("style", "position:absolute;padding:0;margin:0;");
    oElement.setAttribute("oncontextmenu", "return false;");
    oElement.style.fontFamily  = "Tahoma, Sans serif";
    oElement.style.fontSize    = Height * 15 / 20 + "px";
    oElement.style.lineHeight  = Height + "px";
    oElement.style.height      = Height + "px";

    oParentElement.appendChild(oElement);
    return oElement;
};
CDrawingCountColorsWindow.prototype.private_CreateInputElement = function(oParentElement, sName)
{
    var oElement = document.createElement("input");
    oElement.setAttribute("id", sName);
    oElement.setAttribute("style", "position:absolute;padding:0;margin:0;");
    oElement.setAttribute("oncontextmenu", "return false;");
    oElement.setAttribute("type", "text");
    oElement.style.fontFamily  = "Tahoma, Sans serif";
    oElement.style.fontSize    = "10pt";
    oElement.style.outline     = "none";
    oElement.disabled = "disabled";

    oParentElement.appendChild(oElement);
    return oElement;
};
CDrawingCountColorsWindow.prototype.private_CreateInfoElement = function(oMainDiv, oMainControl, sDivId, sName, sValue, TopOffset, RowHeight, bCanEdit)
{
    var LeftWidth  = 100;
    var LeftOffset = 10;
    var RightOffset = 10;

    RightOffset += 20; // Scroll

    var sNameId      = sDivId + sName;
    var oNameElement = this.private_CreateDivElement(oMainDiv, sNameId, RowHeight);
    var oNameControl = CreateControlContainer(sNameId);
    oNameControl.Bounds.SetParams(LeftOffset, TopOffset, 1000, 1000, true, true, false, false, LeftWidth, RowHeight);
    oNameControl.Anchor = (g_anchor_left | g_anchor_top);
    oMainControl.AddControl(oNameControl);
    Common.Set_InnerTextToElement(oNameElement, sName);

    var sValueId      = sNameId + "Value";
    var oValueElement = this.private_CreateInputElement(oMainDiv, sValueId, bCanEdit);
    var oValueControl = CreateControlContainer(sValueId);
    oValueControl.Bounds.SetParams(LeftOffset + LeftWidth, TopOffset + 1, RightOffset, 1000, true, true, true, false, -1, RowHeight - 2);
    oValueControl.Anchor = (g_anchor_left | g_anchor_top | g_anchor_right);
    oMainControl.AddControl(oValueControl);
    oValueElement.value = sValue;

    return oValueElement;
};

function CDrawingGifWriterWindow()
{
    CDrawingGifWriterWindow.superclass.constructor.call(this);

    this.m_oProgressSliderElement = null;
    this.m_oProgressValueElement  = null;
    this.m_oDrawing               = null;
    this.m_oGameTree              = null;
}

CommonExtend(CDrawingGifWriterWindow, CDrawingWindow);

CDrawingGifWriterWindow.prototype.Init = function(_sDivId, oPr)
{
    CDrawingGifWriterWindow.superclass.Init.call(this, _sDivId, false);

    this.Set_Caption("Creating Gif file...");

    var oWindowDiv = document.getElementById(_sDivId);
    oWindowDiv.style.width  = "240px";
    oWindowDiv.style.height = "100px";

    if (oPr.Drawing)
    {
        this.m_oDrawing = oPr.Drawing;

        oWindowDiv.style.left = (this.m_oDrawing.Get_Width() / 2  - 120) + "px";
        oWindowDiv.style.top  = (this.m_oDrawing.Get_Height() / 2 -  50) + "px";
    }

    if (oPr.GameTree)
        this.m_oGameTree = oPr.GameTree;

    var oMainDiv     = this.HtmlElement.InnerDiv;
    var oMainControl = this.HtmlElement.InnerControl;
    var sDivId       = this.HtmlElement.InnerDiv.id;

    var sProgressBack = sDivId + "PB";
    var oProgressBackElement = this.protected_CreateDivElement(oMainDiv, sProgressBack);
    var oProgressBackControl = CreateControlContainer(sProgressBack);
    oProgressBackControl.Bounds.SetParams(6, 30, 8, 8, true, true, true, true, -1,-1);
    oProgressBackControl.Anchor = (g_anchor_top | g_anchor_left | g_anchor_bottom | g_anchor_right);
    oMainControl.AddControl(oProgressBackControl);
    oProgressBackElement.style.border = "1px solid rgb(221,221,221)";
    oProgressBackElement.style.backgroundColor = "rgb(140, 140, 140)";

    var sProgress = sDivId + "P";
    var oProgressElement = this.protected_CreateDivElement(oMainDiv, sProgress);
    var oProgressControl = CreateControlContainer(sProgress);
    oProgressControl.Bounds.SetParams(7, 31, 0, 7, true, true, false, true, 10,-1);
    oProgressControl.Anchor = (g_anchor_top | g_anchor_left | g_anchor_bottom);
    oMainControl.AddControl(oProgressControl);
    oProgressElement.style.backgroundColor = "rgb(54, 101, 179)";

    this.m_oProgressSliderElement = oProgressElement;

    var sDigitProgress = sDivId + "PV";
    var oDigitProgressElement = this.protected_CreateDivElement(oMainDiv, sDigitProgress);
    var oDigitProgressControl = CreateControlContainer(sDigitProgress);
    oDigitProgressControl.Bounds.SetParams(0, 7, 1000, 32, false, false, false, true, -1, -1);
    oDigitProgressControl.Anchor = (g_anchor_top | g_anchor_left | g_anchor_bottom);
    oMainControl.AddControl(oDigitProgressControl);
    oDigitProgressElement.style.fontFamily  = "Tahoma, Sans serif";
    oDigitProgressElement.style.fontSize    = 20 * 15 / 20 + "px";
    oDigitProgressElement.style.lineHeight  = 20 + "px";
    oDigitProgressElement.style.height      = 20 + "px";
    oDigitProgressElement.style.color       = "rgb(0, 0, 0)";
    oDigitProgressElement.style.textAlign   = "center";

    this.m_oProgressValueElement = oDigitProgressElement;
};
CDrawingGifWriterWindow.prototype.On_Progress = function(Progress)
{
    var dWidth = 214;
    this.m_oProgressSliderElement.style.width = (Progress / 100 * dWidth) + "px";

    var dValue = (Progress * 100 | 0) / 100;
    Common.Set_InnerTextToElement(this.m_oProgressValueElement, dValue + "%");
};
CDrawingGifWriterWindow.prototype.On_Start = function()
{
    this.On_Progress(0);

    if (this.m_oDrawing)
        this.m_oDrawing.Disable();
};
CDrawingGifWriterWindow.prototype.On_End = function()
{
    this.On_Progress(100);

    var oThis = this;
    function Close()
    {
        oThis.Close(true);
    }

    // Закрываем окно не сразу, чтобы показать 100%
    setTimeout(Close, 300);
};
CDrawingGifWriterWindow.prototype.Close = function(bEnd)
{
    if (true !== bEnd)
    {
        if (this.m_oGameTree)
            this.m_oGameTree.Abort_DownloadGid();
    }

    if (this.m_oDrawing)
        this.m_oDrawing.Enable();

    CDrawingGifWriterWindow.superclass.Close.apply(this);
};

function CDrawingAboutWindow()
{
    CDrawingAboutWindow.superclass.constructor.call(this);

    this.m_oDrawingBoard = null;
}

CommonExtend(CDrawingAboutWindow, CDrawingWindow);

CDrawingAboutWindow.prototype.Init = function(_sDivId, oPr)
{
    CDrawingGifWriterWindow.superclass.Init.call(this, _sDivId, true);

    var oWindowDiv = document.getElementById(_sDivId);

    if (oPr.Drawing)
    {
        this.m_oDrawing = oPr.Drawing;

        var DrawingW = this.m_oDrawing.Get_Width();
        var DrawingH = this.m_oDrawing.Get_Height();

        var WindowW = Math.max(100, Math.min(700, DrawingW * 0.9));
        var WindowH = Math.max(100, Math.min(600, DrawingH * 0.9));

        oWindowDiv.style.width  = WindowW + "px";
        oWindowDiv.style.height = WindowH + "px";
        oWindowDiv.style.left = Math.max(0, (DrawingW / 2 - WindowW / 2)) + "px";
        oWindowDiv.style.top  = Math.max(0, (DrawingH / 2 - WindowH / 2)) + "px";
    }

    this.Set_Caption("Web Html Go Board Help");

    var oMainDiv     = this.HtmlElement.InnerDiv;
    var oMainControl = this.HtmlElement.InnerControl;
    var sDivId       = this.HtmlElement.InnerDiv.id;

    oMainDiv.style.overflowX = "hidden";
    oMainDiv.style.overflowY = "scroll";

    var oDivMainPart = document.createElement("div");
    oMainDiv.appendChild(oDivMainPart);
    oDivMainPart.style.margin  = "0";
    oDivMainPart.style.padding = "10px 20px";

    oDivMainPart.style.fontFamily = "Tahoma, Arial, Verdana";
    oDivMainPart.style.fontSize   = "12px";
    oDivMainPart.style.color      = "#666";
    oDivMainPart.style.background = "#fff";

    var oHeading = document.createElement("h1");
    oDivMainPart.appendChild(oHeading);
    Common.Set_InnerTextToElement(oHeading, "Keyboard Shortcuts");
    oHeading.style.fontSize   = "16px";
    oHeading.style.fontWeight = "bold";

    var oTable = document.createElement("table");
    oDivMainPart.appendChild(oTable);
    oTable.style.margin = "20px 0";
    oTable.style.width  = "100%";

    var oTBody = document.createElement("tbody");
    oTable.appendChild(oTBody);

    this.m_oDrawingBoard = null;
    if (oPr.GameTree)
        this.m_oDrawingBoard = oPr.GameTree.Get_DrawingBoard();

    this.private_AppendTableHeading1(oTBody,     "Working with Files");

    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 79, ShiftKey : false}, "Open Sgf/Gib/Ngf",                  "Ctrl+O",                                        "Open the Sgf/Gib/Ngf file from disk. (Not in color mode, see below)");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 79, ShiftKey : true }, "Open Sgf",                          "Ctrl+Shift+O",                                  "Open the Sgf file from source. (Not in color mode, see below)");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 83, ShiftKey : false}, "Save Sgf",                          "Ctrl+S",                                        "Save Sgf file.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 72, ShiftKey : false}, "Save png shot",                     "Ctrl+H",                                        "Save board shot in png format.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 72, ShiftKey : true }, "Save gif shot",                     "Ctrl+Shift+H",                                  "Save board shot in gif format.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 73, ShiftKey : false}, "Save multipage gif file.",          "Ctrl+I",                                        "Save gif file for current variant.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 73, ShiftKey : true }, "Save multipage gif file.",          "Ctrl+Shift+I",                                  "Save gif file for all branches with comment RIGHT (for problem mode).");

    this.private_AppendTableHeading1(oTBody,     "Navigation");

    this.private_AppendTableCommonString(oTBody, {CtrlKey : false, KeyCode : 39, ShiftKey : false}, "Next node",                         "Right arrow",                                   "Jump to next node.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 39, ShiftKey : false}, "Next 5 node",                       "Ctrl+Right arrow",                              "Jump over 5 nodes.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 39, ShiftKey : true }, "End of the variant",                "Ctrl+Shift+Right arrow",                        "Jump to the end of the current variant.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : false, KeyCode : 37, ShiftKey : false}, "Previous node",                     "Left arrow",                                    "Jump to previous node.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 37, ShiftKey : false}, "Previous 5 node",                   "Shift+Left arrow",                              "Jump back over 5 nodes.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 37, ShiftKey : true }, "Start of the file",                 "Ctrl+Shift+Right arrow",                        "Jump to the start of the file.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : false, KeyCode : 38, ShiftKey : false}, "Previous variant",                  "Up arrow",                                      "Jump to previous variant.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : false, KeyCode : 40, ShiftKey : false}, "Next variant",                      "Down arrow",                                    "Jump to next variant.");

    this.private_AppendTableHeading2(oTBody, {CtrlKey : false, KeyCode : 112, ShiftKey : false},    "Play mode", "F1");

    this.private_AppendTableCommonString(oTBody, {},                                                "Add move",                          "Left mouse click",                              "Set sequentially stones.");
    this.private_AppendTableCommonString(oTBody, {},                                                "Add alternative move",              "Right mouse click",                             "Create new brunch and add alternative move.");
    this.private_AppendTableCommonString(oTBody, {},                                                "Go to the point",                   "Shift+Left mouse click onto a board position",  "Teleports you to the moment of the game forth or back, when the stone on this position has been played.");
    this.private_AppendTableCommonString(oTBody, {},                                                "Change move order",                 "Ctrl+Shift+Left mouse click",                   "When sequentially stones are entered: changes the colour of the next stone to be set. What stone will appear on the board is shown by the tools field (useful e.g. after a problem has been set up).");
    this.private_AppendTableCommonString(oTBody, {},                                                "Add comment with coordinates",      "Ctrl+Left mouse click",                         "Add comment with coordinates.");

    this.private_AppendTableHeading2(oTBody, {CtrlKey : false, KeyCode : 113, ShiftKey : false},    "Count scores", "F2");

    this.private_AppendTableCommonString(oTBody, {},                                                "Mark dead groups",                  "Left mouse click",                              "Mark dead groups.");
    this.private_AppendTableCommonString(oTBody, {},                                                "End count scores",                  "Ctrl+Left mouse click onto board",              "Return to play mode.");

    this.private_AppendTableHeading2(oTBody, {CtrlKey : false, KeyCode : 114, ShiftKey : false},    "Set up a board position", "F3");

    this.private_AppendTableCommonString(oTBody, {},                                                "Add black stone or remove stone",   "Left mouse click",                              "Add black stone or remove stone.");
    this.private_AppendTableCommonString(oTBody, {},                                                "Add white stone or remove stone",   "Shift+Left mouse click",                        "Add white stone or remove stone.");

    this.private_AppendTableHeading3(oTBody, {CtrlKey : false, KeyCode : 115, ShiftKey : false},    "Triangles",                         "F4",                                           "Add triangles.");
    this.private_AppendTableHeading3(oTBody, {CtrlKey : false, KeyCode : 116, ShiftKey : false},    "Squares",                           "F5",                                           "Add squares.");
    this.private_AppendTableHeading3(oTBody, {CtrlKey : false, KeyCode : 117, ShiftKey : false},    "Circles",                           "F6",                                           "Add circles.");
    this.private_AppendTableHeading3(oTBody, {CtrlKey : false, KeyCode : 118, ShiftKey : false},    "X mark",                            "F7",                                           "Add \"X\" mark.");

    this.private_AppendTableHeading2(oTBody, {CtrlKey : false, KeyCode : 119, ShiftKey : false},    "Text label", "F8");
    this.private_AppendTableCommonString(oTBody, {},                                                "Letter",                            "Left mouse click",                             "Add letter.");
    this.private_AppendTableCommonString(oTBody, {},                                                "Text",                              "Shift+Left mouse click",                       "Add text entered by the user.");
    this.private_AppendTableHeading2(oTBody, {CtrlKey : false, KeyCode : 120, ShiftKey : false},    "Numeric label", "F9");
    this.private_AppendTableCommonString(oTBody, {},                                                "Number",                            "Left mouse click",                             "Add the smallest positive number.");
    this.private_AppendTableCommonString(oTBody, {},                                                "Move number",                       "Shift+Left mouse click",                       "Add number of the first move which was played here.");
    this.private_AppendTableHeading2(oTBody, {CtrlKey : false, KeyCode : 121, ShiftKey : false},    "Color mode", "F10");
    this.private_AppendTableCommonString(oTBody, {},                                                "Blue region",                       "Left mouse click",                             "Add blue region.");
    this.private_AppendTableCommonString(oTBody, {},                                                "Green region",                      "Shift+Left mouse click",                       "Add green region.");
    this.private_AppendTableCommonString(oTBody, {},                                                "Red region",                        "Ctrl+Left mouse click",                        "Add red region.");
    this.private_AppendTableCommonString(oTBody, {},                                                "Gray region",                       "Ctrl+Shift+Left mouse click",                  "Add gray region.");
    this.private_AppendTableCommonString(oTBody, {},                                                "Clear region",                      "Right mouse click",                            "Clear region.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true, KeyCode : 67, ShiftKey : false},  "Continue",                          "Ctrl+C",                                       "Copy all colors from previous node.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true, KeyCode : 79, ShiftKey : false},  "Count colors",                      "Ctrl+O",                                       "Count all colors with depth.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true, KeyCode : 82, ShiftKey : false},  "Clear colors",                      "Ctrl+R",                                       "Clear all colors in the current node.");
    this.private_AppendTableHeading1(oTBody, "Miscellaneous");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : false, KeyCode :  8, ShiftKey : false}, "Remove node",                       "Backspace/Delete",                             "Deletes the current node and all of the following brunches.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 69, ShiftKey : false}, "Score estimator",                   "Ctrl+E",                                       "Show window with score estimator (you can mark dead groups by click on them).");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 86, ShiftKey : false}, "View mode change of the next move", "Ctrl+V",                                       "There are 3 mods: Show all next move variants, show all alternative variants of the current move, show nothing.");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 82, ShiftKey : false}, "Show/Hide coordinates",             "Ctrl+R",                                       "Show/Hide coordinates. (Not in color mode, see above)");
    this.private_AppendTableCommonString(oTBody, {CtrlKey : true,  KeyCode : 77, ShiftKey : true }, "Make the current variant mainly",   "Ctrl+Shift+M",                                 "Make the current variant mainly by uplifting it to the root of the game tree.");
};
CDrawingAboutWindow.prototype.private_AppendTR = function(oTBody)
{
    var oTr = document.createElement("tr");
    oTBody.appendChild(oTr);

    oTr.style.borderLeft     = "0";
    oTr.style.borderRight    = "0";
    oTr.style.borderBottom   = "solid 1px #E4E4E4";
    oTr.style.borderCollapse = "collapse";
    oTr.style.padding        = "8px";
    oTr.style.fontSize       = "12px";
    oTr.style.textAlign      = "left";
    oTr.style.cursor         = "default";

    return oTr;
};
CDrawingAboutWindow.prototype.private_AppendTD = function(oTR, sText)
{
    var oTd = document.createElement("td");
    oTR.appendChild(oTd);
    Common.Set_InnerTextToElement(oTd, sText);

    oTd.style.borderLeft     = "0";
    oTd.style.borderRight    = "0";
    oTd.style.borderBottom   = "solid 1px #E4E4E4";
    oTd.style.borderCollapse = "collapse";
    oTd.style.padding        = "8px";
    oTd.style.fontSize       = "12px";
    oTd.style.textAlign      = "left";
    oTd.style.cursor         = "default";

    return oTd;
};
CDrawingAboutWindow.prototype.private_SetEventListener = function(oElement, oEventPr)
{
    var oDrawingBoard = this.m_oDrawingBoard;
    if (oDrawingBoard && oEventPr.KeyCode)
    {
        oElement.title = "Click to do it";
        oElement.style.cursor = "pointer";
        oElement.style.textDecoration = "underline";
        oElement.addEventListener("click", function()
        {
            oDrawingBoard.private_HandleKeyDown(oEventPr);
        }, false);
    }
};
CDrawingAboutWindow.prototype.private_AppendTableHeading1 = function(oTBody, sText)
{
    var oTr = this.private_AppendTR(oTBody);
    var oTd = this.private_AppendTD(oTr, sText);
    oTd.colSpan = "3";

    oTd.style.fontSize   = "14px";
    oTd.style.fontWeight = "bold";
    oTd.style.paddingTop = "20px";
};
CDrawingAboutWindow.prototype.private_AppendTableHeading2 = function(oTBody, oEventPr, sText1, sText2)
{
    var oTr = this.private_AppendTR(oTBody);
    var oTd1 = this.private_AppendTD(oTr, sText1);
    oTd1.style.fontWeight = "bold";
    var oTd2 = this.private_AppendTD(oTr, sText2);
    this.private_SetEventListener(oTd2, oEventPr);
    oTd2.colSpan = "2";
};
CDrawingAboutWindow.prototype.private_AppendTableHeading3 = function(oTBody, oEventPr, sText1, sText2, sText3)
{
    var oTr = this.private_AppendTR(oTBody);
    this.private_AppendTD(oTr, sText1).style.fontWeight = "bold";
    var oTd = this.private_AppendTD(oTr, sText2);
    this.private_SetEventListener(oTd, oEventPr);
    this.private_AppendTD(oTr, sText3);
};
CDrawingAboutWindow.prototype.private_AppendTableCommonString = function(oTBody, oEventPr, sText1, sText2, sText3)
{
    var oTr = this.private_AppendTR(oTBody);
    this.private_AppendTD(oTr, sText1).style.width = "35%";
    var oTd = this.private_AppendTD(oTr, sText2);
    oTd.style.width = "15%";
    this.private_SetEventListener(oTd, oEventPr);
    this.private_AppendTD(oTr, sText3).style.width = "50%";
};

var EWindowType =
{
    Common        : 0,
    Confirm       : 1,
    Error         : 2,
    GameInfo      : 3,
    Settings      : 4,
    ScoreEstimate : 5,
    CountColors   : 6,
    GifWriter     : 7,
    About         : 8
};


function CreateWindow(sDrawingId, nWindowType, oPr)
{
    var sApp = "unknownwindow";
    switch (nWindowType)
    {
        case EWindowType.GameInfo      : sApp = "Info"; break;
        case EWindowType.Settings      : sApp = "Settings"; break;
        case EWindowType.Error         : sApp = "Error"; break;
        case EWindowType.ScoreEstimate : sApp = "ScoreEstimate"; break;
        case EWindowType.CountColors   : sApp = "CountColors"; break;
        case EWindowType.GifWriter     : sApp = "GifWriter"; break;
        case EWindowType.About         : sApp = "About"; break;
    }
    var sId = sDrawingId + sApp;

    var oDiv = document.getElementById(sId);
    if (oDiv)
    {
        oDiv.style.left    = "300px";
        oDiv.style.top     = "300px";
    }
    else
    {
        oDiv = document.createElement("div");
        oDiv.setAttribute("id", sId);
        oDiv.setAttribute("style", "position:absolute;padding:0;margin:0;width:500px;height:500px;left:300px;top:300px;");
        oDiv.setAttribute("oncontextmenu", "return false;");
        var aBody = document.getElementsByTagName('body');

        if (aBody.length > 0)
        {
            var oBody = aBody[0];
            oBody.appendChild(oDiv);

            var oWindow = null;

            switch (nWindowType)
            {
                case EWindowType.GameInfo      : oWindow = new CDrawingInfoWindow(); break;
                case EWindowType.Settings      : oWindow = new CDrawingSettingsWindow(); break;
                case EWindowType.Error         : oWindow = new CDrawingErrorWindow(); break;
                case EWindowType.ScoreEstimate : oWindow = new CDrawingScoreEstimateWindow(); break;
                case EWindowType.CountColors   : oWindow = new CDrawingCountColorsWindow(); break;
                case EWindowType.GifWriter     : oWindow = new CDrawingGifWriterWindow(); break;
                case EWindowType.About         : oWindow = new CDrawingAboutWindow(); break;
            }

            if (null !== oWindow)
            {
                oWindow.Init(sId, oPr);
                oWindow.Update_Size(true);
            }

            return oWindow;
        }
    }

    return null;
};